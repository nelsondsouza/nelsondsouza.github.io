/**
 * Dependency Lines - Draw SVG lines connecting dependent tasks
 */

class DependencyLinesRenderer {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
        this.taskManager = null;
        
        this.rowHeight = 32;
        this.barHeight = 20;
        this.barPadding = 6;
    }
    
    setTaskManager(taskManager) {
        this.taskManager = taskManager;
    }
    
    /**
     * Render all dependency lines
     */
    render(startDate, zoomLevel) {
        const linesGroup = document.getElementById('dependencyLines');
        linesGroup.innerHTML = '';
        
        if (!this.taskManager) return;
        
        const tasks = this.taskManager.getAllTasks();
        const cellWidth = this.getCellWidth(zoomLevel);
        
        tasks.forEach((task, index) => {
            if (task.predecessors.length > 0) {
                task.predecessors.forEach(pred => {
                    const predTask = this.taskManager.getTask(pred.taskId);
                    if (predTask) {
                        const predIndex = tasks.findIndex(t => t.id === predTask.id);
                        if (predIndex !== -1) {
                            const line = this.createDependencyLine(
                                predTask,
                                task,
                                predIndex,
                                index,
                                pred,
                                cellWidth,
                                startDate
                            );
                            linesGroup.appendChild(line);
                        }
                    }
                });
            }
        });
    }
    
    getCellWidth(zoomLevel) {
        switch (zoomLevel) {
            case 'hour': return 20;
            case 'day': return 40;
            case 'week': return 80;
            case 'month': return 120;
            default: return 40;
        }
    }
    
    /**
     * Create a dependency line between two tasks
     */
    createDependencyLine(fromTask, toTask, fromIndex, toIndex, pred, cellWidth, startDate) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('dependency-group');
        
        // Get coordinates
        const fromCoords = this.getTaskCoords(fromTask, fromIndex, cellWidth, startDate);
        const toCoords = this.getTaskCoords(toTask, toIndex, cellWidth, startDate);
        
        // Determine line type based on dependency type
        let startPoint, endPoint;
        
        switch (pred.type) {
            case 'FS': // Finish-to-Start
                startPoint = { x: fromCoords.endX, y: fromCoords.centerY };
                endPoint = { x: toCoords.startX, y: toCoords.centerY };
                break;
            case 'SS': // Start-to-Start
                startPoint = { x: fromCoords.startX, y: fromCoords.centerY };
                endPoint = { x: toCoords.startX, y: toCoords.centerY };
                break;
            case 'FF': // Finish-to-Finish
                startPoint = { x: fromCoords.endX, y: fromCoords.centerY };
                endPoint = { x: toCoords.endX, y: toCoords.centerY };
                break;
            case 'SF': // Start-to-Finish
                startPoint = { x: fromCoords.startX, y: fromCoords.centerY };
                endPoint = { x: toCoords.endX, y: toCoords.centerY };
                break;
            default:
                startPoint = { x: fromCoords.endX, y: fromCoords.centerY };
                endPoint = { x: toCoords.startX, y: toCoords.centerY };
        }
        
        // Create path
        const path = this.createPath(startPoint, endPoint, fromCoords, toCoords);
        
        // Determine line class
        let lineClass = `dependency-line ${pred.type.toLowerCase()}`;
        if (fromTask.isCritical && toTask.isCritical) {
            lineClass += ' critical';
        }
        path.setAttribute('class', lineClass);
        
        group.appendChild(path);
        
        // Add arrow at end
        const arrow = this.createArrow(endPoint, startPoint, pred.type);
        if (arrow) {
            group.appendChild(arrow);
        }
        
        return group;
    }
    
    /**
     * Get task coordinates
     */
    getTaskCoords(task, index, cellWidth, startDate) {
        const y = index * this.rowHeight + this.barPadding;
        const centerY = y + this.barHeight / 2;
        
        let start, end;
        
        if (task.isMilestone) {
            start = task.earlyStart || task.startDate;
            end = start;
        } else {
            start = task.earlyStart || task.startDate;
            end = task.earlyFinish || task.endDate;
        }
        
        const startX = this.dateToX(start, cellWidth, startDate);
        const endX = this.dateToX(end, cellWidth, startDate);
        
        return {
            startX: startX,
            endX: endX,
            centerY: centerY,
            y: y,
            barHeight: this.barHeight
        };
    }
    
    dateToX(date, cellWidth, startDate) {
        const diff = Math.ceil((date - startDate) / (1000 * 60 * 60 * 24));
        return diff * cellWidth;
    }
    
    /**
     * Create SVG path for dependency line
     */
    createPath(start, end, fromCoords, toCoords) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        const dx = end.x - start.x;
        const offset = 15; // Horizontal offset for elbow
        
        let d;
        
        if (dx >= offset) {
            // Simple horizontal connection
            d = `M ${start.x} ${start.y} 
                 L ${start.x + offset} ${start.y}
                 L ${start.x + offset} ${end.y}
                 L ${end.x - 10} ${end.y}`;
        } else {
            // Need to go around
            const midY = (start.y + end.y) / 2;
            d = `M ${start.x} ${start.y}`;
            
            if (start.x < end.x) {
                // Standard S-curve
                d += ` L ${start.x + offset} ${start.y}`;
                d += ` L ${start.x + offset} ${midY}`;
                d += ` L ${end.x - offset} ${midY}`;
                d += ` L ${end.x - offset} ${end.y}`;
                d += ` L ${end.x - 10} ${end.y}`;
            } else {
                // Backward dependency - go around
                const loopBack = 20;
                d += ` L ${start.x + offset} ${start.y}`;
                d += ` L ${start.x + offset} ${start.y + (end.y > start.y ? loopBack : -loopBack)}`;
                d += ` L ${end.x - offset} ${start.y + (end.y > start.y ? loopBack : -loopBack)}`;
                d += ` L ${end.x - offset} ${end.y}`;
                d += ` L ${end.x - 10} ${end.y}`;
            }
        }
        
        path.setAttribute('d', d);
        
        return path;
    }
    
    /**
     * Create arrow marker at end of line
     */
    createArrow(endPoint, startPoint, depType) {
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        
        // Calculate angle
        const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
        
        // Arrow size
        const size = 8;
        
        // Calculate arrow points
        const tipX = endPoint.x;
        const tipY = endPoint.y;
        
        let baseX, baseY, leftX, leftY, rightX, rightY;
        
        // Different arrow shapes based on dependency type
        if (depType === 'SS' || depType === 'FF') {
            // Diamond shape for SS and FF
            baseX = tipX - size * Math.cos(angle);
            baseY = tipY - size * Math.sin(angle);
            leftX = tipX - size * 0.5 * Math.cos(angle + Math.PI / 2);
            leftY = tipY - size * 0.5 * Math.sin(angle + Math.PI / 2);
            rightX = tipX - size * 0.5 * Math.cos(angle - Math.PI / 2);
            rightY = tipY - size * 0.5 * Math.sin(angle - Math.PI / 2);
        } else {
            // Standard arrow
            baseX = tipX - size * Math.cos(angle);
            baseY = tipY - size * Math.sin(angle);
            leftX = baseX + size * 0.5 * Math.cos(angle + Math.PI / 2);
            leftY = baseY + size * 0.5 * Math.sin(angle + Math.PI / 2);
            rightX = baseX + size * 0.5 * Math.cos(angle - Math.PI / 2);
            rightY = baseY + size * 0.5 * Math.sin(angle - Math.PI / 2);
        }
        
        const points = `${tipX},${tipY} ${leftX},${leftY} ${baseX},${baseY} ${rightX},${rightY}`;
        arrow.setAttribute('points', points);
        
        // Set color based on dependency type
        let fillClass = 'dep-fs';
        switch (depType) {
            case 'FS': fillClass = '#3b82f6'; break;
            case 'SS': fillClass = '#f59e0b'; break;
            case 'FF': fillClass = '#10b981'; break;
            case 'SF': fillClass = '#8b5cf6'; break;
        }
        arrow.setAttribute('fill', fillClass);
        
        return arrow;
    }
}

// Export for use in other modules
window.DependencyLinesRenderer = DependencyLinesRenderer;
