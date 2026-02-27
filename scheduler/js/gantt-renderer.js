/**
 * Gantt Renderer - SVG-based Gantt chart rendering
 */

class GanttRenderer {
    constructor(containerId, headerId, bodyId, svgId) {
        this.container = document.getElementById(containerId);
        this.header = document.getElementById(headerId);
        this.body = document.getElementById(bodyId);
        this.svg = document.getElementById(svgId);
        
        this.taskManager = null;
        this.calculator = null;
        
        // Zoom configuration
        this.zoomLevel = 'day'; // hour, day, week, month
        this.dayWidth = 40;
        
        // Scroll synchronization
        this.isScrolling = false;
        
        // Task bar dimensions
        this.rowHeight = 32;
        this.barHeight = 20;
        this.barPadding = 6;
        
        // Date range
        this.startDate = null;
        this.endDate = null;
        this.totalDays = 0;
        
        // Selection
        this.selectedTaskId = null;
        this.dragState = null;
        
        // Bind scroll synchronization
        this.bindEvents();
    }
    
    bindEvents() {
        // Sync horizontal scroll between header and body
        this.body.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.header.scrollLeft = this.body.scrollLeft;
                setTimeout(() => { this.isScrolling = false; }, 50);
            }
        });
        
        // Handle task bar clicks
        this.svg.addEventListener('click', (e) => {
            const taskGroup = e.target.closest('.gantt-task-group');
            if (taskGroup) {
                const taskId = taskGroup.dataset.taskId;
                this.selectTask(taskId);
            } else {
                this.selectTask(null);
            }
        });
        
        // Enable drag
        this.enableDrag();
    }
    
    setTaskManager(taskManager) {
        this.taskManager = taskManager;
    }
    
    setCalculator(calculator) {
        this.calculator = calculator;
    }
    
    /**
     * Main render function
     */
    render() {
        if (!this.taskManager) return;
        
        this.calculateDateRange();
        this.renderTimeScale();
        this.renderGridLines();
        this.renderTaskBars();
        
        // Update SVG dimensions
        this.updateSvgDimensions();
    }
    
    /**
     * Calculate date range from all tasks
     */
    calculateDateRange() {
        const tasks = this.taskManager.getAllTasks();
        
        if (tasks.length === 0) {
            this.startDate = new Date();
            this.endDate = new Date();
            this.endDate.setDate(this.endDate.getDate() + 30);
            this.totalDays = 30;
            return;
        }
        
        let minDate = new Date(8640000000000000);
        let maxDate = new Date(0);
        
        tasks.forEach(task => {
            const start = task.earlyStart || task.startDate;
            const end = task.earlyFinish || task.endDate;
            
            if (start < minDate) minDate = new Date(start);
            if (end > maxDate) maxDate = new Date(end);
        });
        
        // Add padding
        this.startDate = new Date(minDate);
        this.startDate.setDate(this.startDate.getDate() - 7);
        
        this.endDate = new Date(maxDate);
        this.endDate.setDate(this.endDate.getDate() + 14);
        
        this.totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
    }
    
    /**
     * Render the time scale header
     */
    renderTimeScale() {
        const headerInner = document.createElement('div');
        headerInner.className = 'gantt-header-inner';
        
        const cellWidth = this.getCellWidth();
        
        switch (this.zoomLevel) {
            case 'hour':
                this.renderHourlyScale(headerInner, cellWidth);
                break;
            case 'day':
                this.renderDailyScale(headerInner, cellWidth);
                break;
            case 'week':
                this.renderWeeklyScale(headerInner, cellWidth);
                break;
            case 'month':
                this.renderMonthlyScale(headerInner, cellWidth);
                break;
        }
        
        this.header.innerHTML = '';
        this.header.appendChild(headerInner);
    }
    
    getCellWidth() {
        switch (this.zoomLevel) {
            case 'hour': return 20;
            case 'day': return this.dayWidth;
            case 'week': return 80;
            case 'month': return 120;
            default: return this.dayWidth;
        }
    }
    
    renderDailyScale(headerInner, cellWidth) {
        const months = new Map();
        let currentDate = new Date(this.startDate);
        
        // Group days by month
        while (currentDate <= this.endDate) {
            const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
            if (!months.has(monthKey)) {
                months.set(monthKey, {
                    name: currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    days: []
                });
            }
            months.get(monthKey).days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Render month headers
        months.forEach((monthData) => {
            const monthWidth = monthData.days.length * cellWidth;
            
            // Top cell (month name)
            const topCell = document.createElement('div');
            topCell.className = 'gantt-header-cell top';
            topCell.style.width = `${monthWidth}px`;
            topCell.textContent = monthData.name;
            headerInner.appendChild(topCell);
        });
        
        // Bottom cells (days)
        currentDate = new Date(this.startDate);
        while (currentDate <= this.endDate) {
            const dayCell = document.createElement('div');
            dayCell.className = 'gantt-header-cell bottom';
            dayCell.style.width = `${cellWidth}px`;
            
            const dayOfWeek = currentDate.getDay();
            dayCell.textContent = currentDate.getDate();
            
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayCell.style.background = '#e2e8f0';
            }
            
            headerInner.appendChild(dayCell);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    renderWeeklyScale(headerInner, cellWidth) {
        const currentDate = new Date(this.startDate);
        
        // Find start of week
        const dayOfWeek = currentDate.getDay();
        currentDate.setDate(currentDate.getDate() - dayOfWeek);
        
        while (currentDate <= this.endDate) {
            const weekEnd = new Date(currentDate);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            const weekWidth = 7 * cellWidth;
            
            // Top cell (week range)
            const topCell = document.createElement('div');
            topCell.className = 'gantt-header-cell top';
            topCell.style.width = `${weekWidth}px`;
            topCell.textContent = `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
            headerInner.appendChild(topCell);
            
            currentDate.setDate(currentDate.getDate() + 7);
        }
        
        // Reset and render days
        currentDate = new Date(this.startDate);
        while (currentDate <= this.endDate) {
            const dayCell = document.createElement('div');
            dayCell.className = 'gantt-header-cell bottom';
            dayCell.style.width = `${cellWidth}px`;
            
            const dayOfWeek = currentDate.getDay();
            dayCell.textContent = currentDate.getDate();
            
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayCell.style.background = '#e2e8f0';
            }
            
            headerInner.appendChild(dayCell);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    renderMonthlyScale(headerInner, cellWidth) {
        const currentDate = new Date(this.startDate);
        currentDate.setDate(1);
        
        while (currentDate <= this.endDate) {
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            const monthWidth = daysInMonth * cellWidth;
            
            // Top cell (month name)
            const topCell = document.createElement('div');
            topCell.className = 'gantt-header-cell top';
            topCell.style.width = `${monthWidth}px`;
            topCell.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            headerInner.appendChild(topCell);
            
            // Bottom cells (weeks)
            const weeksInMonth = Math.ceil((daysInMonth + new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()) / 7);
            for (let w = 0; w < weeksInMonth; w++) {
                const weekCell = document.createElement('div');
                weekCell.className = 'gantt-header-cell bottom';
                weekCell.style.width = `${7 * cellWidth}px`;
                weekCell.textContent = `W${w + 1}`;
                headerInner.appendChild(weekCell);
            }
            
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    }
    
    renderHourlyScale(headerInner, cellWidth) {
        const currentDate = new Date(this.startDate);
        
        while (currentDate <= this.endDate) {
            // Top cell (date)
            const topCell = document.createElement('div');
            topCell.className = 'gantt-header-cell top';
            topCell.style.width = `${24 * cellWidth}px`;
            topCell.textContent = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            headerInner.appendChild(topCell);
            
            // Bottom cells (hours)
            for (let h = 0; h < 24; h++) {
                const hourCell = document.createElement('div');
                hourCell.className = 'gantt-header-cell bottom';
                hourCell.style.width = `${cellWidth}px`;
                hourCell.textContent = h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`;
                hourCell.style.fontSize = '9px';
                headerInner.appendChild(hourCell);
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    /**
     * Render grid lines
     */
    renderGridLines() {
        const gridLines = document.getElementById('gridLines');
        gridLines.innerHTML = '';
        
        const cellWidth = this.getCellWidth();
        
        // Vertical grid lines
        let currentDate = new Date(this.startDate);
        let x = 0;
        
        while (currentDate <= this.endDate) {
            const dayOfWeek = currentDate.getDay();
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
            const isMonthStart = currentDate.getDate() === 1;
            
            if (isMonthStart) {
                const line = this.createLine(x, 0, x, this.getTasksHeight(), 'grid-line month');
                gridLines.appendChild(line);
            } else if (isWeekend) {
                const line = this.createLine(x, 0, x, this.getTasksHeight(), 'grid-line weekend');
                gridLines.appendChild(line);
            }
            
            x += cellWidth;
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    createLine(x1, y1, x2, y2, className) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', className);
        return line;
    }
    
    /**
     * Render task bars
     */
    renderTaskBars() {
        const taskBars = document.getElementById('taskBars');
        taskBars.innerHTML = '';
        
        const tasks = this.taskManager.getAllTasks();
        const cellWidth = this.getCellWidth();
        
        tasks.forEach((task, index) => {
            const group = this.createTaskBar(task, index, cellWidth);
            taskBars.appendChild(group);
        });
    }
    
    createTaskBar(task, index, cellWidth) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('gantt-task-group');
        group.dataset.taskId = task.id;
        
        const y = index * this.rowHeight + this.barPadding;
        
        // Calculate position and width
        let startX, width;
        
        if (task.isMilestone) {
            // Milestone - diamond shape
            const ms = task.earlyStart || task.startDate;
            startX = this.dateToX(ms, cellWidth);
            const msSize = this.barHeight;
            
            const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            const points = [
                `${startX + msSize/2},${y}`,
                `${startX + msSize},${y + msSize/2}`,
                `${startX + msSize/2},${y + msSize}`,
                `${startX},${y + msSize/2}`
            ].join(' ');
            diamond.setAttribute('points', points);
            diamond.setAttribute('class', 'milestone-marker');
            group.appendChild(diamond);
        } else {
            const start = task.earlyStart || task.startDate;
            const end = task.earlyFinish || task.endDate;
            
            startX = this.dateToX(start, cellWidth);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            width = Math.max(days * cellWidth, cellWidth);
            
            // Background (full bar)
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bg.setAttribute('x', startX);
            bg.setAttribute('y', y);
            bg.setAttribute('width', width);
            bg.setAttribute('height', this.barHeight);
            bg.setAttribute('class', 'task-bar-bg');
            group.appendChild(bg);
            
            // Task bar
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', startX);
            bar.setAttribute('y', y);
            bar.setAttribute('width', width);
            bar.setAttribute('height', this.barHeight);
            
            let barClass = 'task-bar normal';
            if (task.isCritical) barClass = 'task-bar critical';
            else if (task.isSummary) barClass = 'task-bar summary';
            bar.setAttribute('class', barClass);
            group.appendChild(bar);
            
            // Progress fill
            if (task.percentComplete > 0) {
                const progressWidth = (width * task.percentComplete) / 100;
                const progress = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                progress.setAttribute('x', startX);
                progress.setAttribute('y', y);
                progress.setAttribute('width', progressWidth);
                progress.setAttribute('height', this.barHeight);
                progress.setAttribute('class', 'task-progress');
                group.appendChild(progress);
            }
            
            // Task label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', startX + 4);
            label.setAttribute('y', y + this.barHeight / 2 + 4);
            
            let labelClass = 'task-label';
            if (task.isCritical) labelClass = 'task-label';
            else labelClass = 'task-label-dark';
            
            label.setAttribute('class', labelClass);
            label.textContent = task.name.length > 20 ? task.name.substring(0, 18) + '...' : task.name;
            group.appendChild(label);
        }
        
        return group;
    }
    
    dateToX(date, cellWidth) {
        const diff = Math.ceil((date - this.startDate) / (1000 * 60 * 60 * 24));
        return diff * cellWidth;
    }
    
    xToDate(x, cellWidth) {
        const days = Math.round(x / cellWidth);
        const date = new Date(this.startDate);
        date.setDate(date.getDate() + days);
        return date;
    }
    
    getTasksHeight() {
        const tasks = this.taskManager.getAllTasks();
        return tasks.length * this.rowHeight;
    }
    
    /**
     * Update SVG dimensions
     */
    updateSvgDimensions() {
        const cellWidth = this.getCellWidth();
        const width = this.totalDays * cellWidth;
        const height = Math.max(this.getTasksHeight(), this.body.clientHeight);
        
        this.svg.setAttribute('width', width);
        this.svg.setAttribute('height', height);
    }
    
    /**
     * Zoom in
     */
    zoomIn() {
        const levels = ['month', 'week', 'day', 'hour'];
        const currentIndex = levels.indexOf(this.zoomLevel);
        if (currentIndex < levels.length - 1) {
            this.zoomLevel = levels[currentIndex + 1];
            this.render();
        }
    }
    
    /**
     * Zoom out
     */
    zoomOut() {
        const levels = ['month', 'week', 'day', 'hour'];
        const currentIndex = levels.indexOf(this.zoomLevel);
        if (currentIndex > 0) {
            this.zoomLevel = levels[currentIndex - 1];
            this.render();
        }
    }
    
    /**
     * Get current zoom level text
     */
    getZoomLevelText() {
        const texts = {
            'hour': 'Hour',
            'day': 'Day',
            'week': 'Week',
            'month': 'Month'
        };
        return texts[this.zoomLevel] || 'Day';
    }
    
    /**
     * Select a task
     */
    selectTask(taskId) {
        this.selectedTaskId = taskId;
        
        // Update visual selection
        document.querySelectorAll('.gantt-task-group').forEach(group => {
            group.classList.remove('selected');
            if (group.dataset.taskId === taskId) {
                group.classList.add('selected');
            }
        });
        
        // Also update table selection
        if (window.schedulerApp) {
            window.schedulerApp.selectTaskInTable(taskId);
        }
    }
    
    /**
     * Enable drag functionality
     */
    enableDrag() {
        let isDragging = false;
        let dragType = null;
        let startX = 0;
        let originalTaskData = null;
        
        this.svg.addEventListener('mousedown', (e) => {
            const taskGroup = e.target.closest('.gantt-task-group');
            if (!taskGroup) return;
            
            const taskId = taskGroup.dataset.taskId;
            const task = this.taskManager.getTask(taskId);
            if (!task || task.isMilestone) return;
            
            e.preventDefault();
            isDragging = true;
            dragType = 'move';
            startX = e.clientX;
            originalTaskData = {
                startDate: new Date(task.startDate),
                duration: task.duration
            };
            
            this.dragState = {
                taskId,
                startX,
                originalTaskData
            };
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !this.dragState) return;
            
            const cellWidth = this.getCellWidth();
            const dx = e.clientX - this.dragState.startX;
            const daysMoved = Math.round(dx / cellWidth);
            
            if (daysMoved !== 0) {
                const task = this.taskManager.getTask(this.dragState.taskId);
                if (task) {
                    const newStart = new Date(this.dragState.originalTaskData.startDate);
                    newStart.setDate(newStart.getDate() + daysMoved);
                    
                    // Update task
                    task.startDate = newStart;
                    task.endDate = task.calculateEndDate();
                    
                    // Re-render
                    this.render();
                    
                    // Trigger recalculation
                    if (window.schedulerApp) {
                        window.schedulerApp.scheduleChanged();
                    }
                }
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging && this.dragState) {
                // Save to history or auto-save
                if (window.schedulerApp) {
                    window.schedulerApp.scheduleChanged();
                }
            }
            isDragging = false;
            dragType = null;
            this.dragState = null;
        });
    }
}

// Export for use in other modules
window.GanttRenderer = GanttRenderer;
