/**
 * Project Scheduler - Main Application
 * Browser-based project scheduling application like Primavera P6 / MS Project
 */

class SchedulerApp {
    constructor() {
        this.taskManager = new TaskManager();
        this.calculator = new ScheduleCalculator(this.taskManager);
        this.ganttRenderer = new GanttRenderer('ganttContainer', 'ganttHeader', 'ganttBody', 'ganttSvg');
        this.dependencyRenderer = new DependencyLinesRenderer('ganttSvg');
        this.csvHandler = new CSVHandler(this.taskManager);
        this.storage = new StorageManager('projectScheduler');
        
        this.isDirty = false;
        
        this.init();
    }
    
    init() {
        // Set up renderer connections
        this.ganttRenderer.setTaskManager(this.taskManager);
        this.ganttRenderer.setCalculator(this.calculator);
        this.dependencyRenderer.setTaskManager(this.taskManager);
        
        // Bind UI events
        this.bindToolbarEvents();
        this.bindModalEvents();
        
        // Load last project or create sample
        this.loadInitialProject();
        
        // Initial render
        this.render();
        
        // Set up auto-save
        this.storage.setupAutoSave(this, 60000); // Auto-save every minute
        
        // Listen for beforeunload to warn about unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.isDirty) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        });
        
        // Expose for global access
        window.schedulerApp = this;
    }
    
    /**
     * Load initial project (last project or sample)
     */
    loadInitialProject() {
        const lastProject = this.storage.getLastProjectName();
        
        if (lastProject) {
            try {
                const data = this.storage.loadProject(lastProject);
                this.taskManager.loadFromData(data);
                this.calculate();
                this.showToast('Loaded last project: ' + lastProject, 'success');
            } catch (e) {
                this.createSampleProject();
            }
        } else {
            // Create sample project for demonstration
            this.createSampleProject();
        }
    }
    
    /**
     * Bind toolbar button events
     */
    bindToolbarEvents() {
        // New Project
        document.getElementById('btnNewProject').addEventListener('click', () => {
            if (this.isDirty) {
                if (!confirm('You have unsaved changes. Create new project anyway?')) {
                    return;
                }
            }
            this.taskManager.createSampleProject();
            this.calculate();
            this.render();
            this.showToast('Created new sample project', 'info');
        });
        
        // Load Project
        document.getElementById('btnLoadProject').addEventListener('click', () => {
            this.showLoadModal();
        });
        
        // Save Project
        document.getElementById('btnSaveProject').addEventListener('click', () => {
            this.saveCurrentProject();
        });
        
        // Add Task
        document.getElementById('btnAddTask').addEventListener('click', () => {
            this.showTaskModal();
        });
        
        // Add Milestone
        document.getElementById('btnAddMilestone').addEventListener('click', () => {
            this.showTaskModal(null, true);
        });
        
        // Delete Task
        document.getElementById('btnDeleteTask').addEventListener('click', () => {
            this.deleteSelectedTask();
        });
        
        // Zoom In
        document.getElementById('btnZoomIn').addEventListener('click', () => {
            this.ganttRenderer.zoomIn();
            this.updateZoomDisplay();
            this.dependencyRenderer.render(
                this.ganttRenderer.startDate,
                this.ganttRenderer.zoomLevel
            );
        });
        
        // Zoom Out
        document.getElementById('btnZoomOut').addEventListener('click', () => {
            this.ganttRenderer.zoomOut();
            this.updateZoomDisplay();
            this.dependencyRenderer.render(
                this.ganttRenderer.startDate,
                this.ganttRenderer.zoomLevel
            );
        });
        
        // Toggle Critical Path
        document.getElementById('btnToggleCritical').addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('active');
            // Re-render with or without critical highlighting
            this.renderTaskTable();
        });
        
        // Recalculate
        document.getElementById('btnRecalculate').addEventListener('click', () => {
            this.calculate();
            this.render();
            this.showToast('Schedule recalculated', 'success');
        });
        
        // Import CSV
        document.getElementById('btnImportCSV').addEventListener('click', () => {
            this.showImportModal();
        });
        
        // Export CSV
        document.getElementById('btnExportCSV').addEventListener('click', () => {
            this.exportCSV();
        });
    }
    
    /**
     * Bind modal events
     */
    bindModalEvents() {
        // Task Modal
        document.getElementById('modalClose').addEventListener('click', () => {
            this.hideTaskModal();
        });
        
        document.getElementById('btnCancelTask').addEventListener('click', () => {
            this.hideTaskModal();
        });
        
        document.getElementById('btnSaveTask').addEventListener('click', () => {
            this.saveTaskFromModal();
        });
        
        // Load Modal
        document.getElementById('loadModalClose').addEventListener('click', () => {
            this.hideLoadModal();
        });
        
        document.getElementById('btnNewProjectFromModal').addEventListener('click', () => {
            this.hideLoadModal();
            this.createSampleProject();
        });
        
        document.getElementById('btnClearStorage').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all saved projects?')) {
                this.storage.clearAllProjects();
                this.showLoadModal();
            }
        });
        
        // Import Modal
        document.getElementById('importModalClose').addEventListener('click', () => {
            this.hideImportModal();
        });
        
        document.getElementById('btnCancelImport').addEventListener('click', () => {
            this.hideImportModal();
        });
        
        document.getElementById('btnConfirmImport').addEventListener('click', () => {
            this.confirmImport();
        });
        
        // CSV file change
        document.getElementById('csvFile').addEventListener('change', (e) => {
            this.previewCSV(e.target.files[0]);
        });
        
        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });
    }
    
    /**
     * Render everything
     */
    render() {
        this.renderTaskTable();
        this.ganttRenderer.render();
        this.dependencyRenderer.render(
            this.ganttRenderer.startDate,
            this.ganttRenderer.zoomLevel
        );
        this.updateStatusBar();
        this.updateZoomDisplay();
    }
    
    /**
     * Render the task table
     */
    renderTaskTable() {
        const tbody = document.getElementById('taskTableBody');
        tbody.innerHTML = '';
        
        const tasks = this.taskManager.getAllTasks();
        const showCritical = document.getElementById('btnToggleCritical').classList.contains('active');
        
        tasks.forEach(task => {
            // Filter by critical if toggle is active
            if (showCritical && !task.isCritical) {
                return;
            }
            
            const tr = document.createElement('tr');
            tr.dataset.taskId = task.id;
            
            if (task.isCritical) {
                tr.classList.add('critical');
            }
            
            if (this.ganttRenderer.selectedTaskId === task.id) {
                tr.classList.add('selected');
            }
            
            tr.innerHTML = `
                <td>${task.id}</td>
                <td class="col-name">${task.isMilestone ? '🔹 ' : ''}${task.name}</td>
                <td>${this.formatDateShort(task.earlyStart || task.startDate)}</td>
                <td>${this.formatDateShort(task.earlyFinish || task.endDate)}</td>
                <td>${task.isMilestone ? '-' : task.duration}</td>
                <td>${task.percentComplete}%</td>
                <td class="col-predecessors">${task.getPredecessorString() || '-'}</td>
                <td>${task.totalFloat}</td>
                <td>${task.isCritical ? '✓' : '-'}</td>
            `;
            
            tr.addEventListener('click', () => {
                this.selectTaskInTable(task.id);
                this.ganttRenderer.selectTask(task.id);
            });
            
            tr.addEventListener('dblclick', () => {
                this.showTaskModal(task.id);
            });
            
            tbody.appendChild(tr);
        });
    }
    
    /**
     * Select task in table
     */
    selectTaskInTable(taskId) {
        // Update table selection
        document.querySelectorAll('#taskTableBody tr').forEach(tr => {
            tr.classList.remove('selected');
            if (tr.dataset.taskId === taskId) {
                tr.classList.add('selected');
                tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        // Update hidden selected task for delete
        this.selectedTaskId = taskId;
    }
    
    /**
     * Delete selected task
     */
    deleteSelectedTask() {
        const taskId = this.ganttRenderer.selectedTaskId || this.selectedTaskId;
        
        if (!taskId) {
            this.showToast('No task selected', 'warning');
            return;
        }
        
        if (confirm(`Delete task "${this.taskManager.getTask(taskId).name}"?`)) {
            this.taskManager.deleteTask(taskId);
            this.scheduleChanged();
            this.calculate();
            this.render();
            this.showToast('Task deleted', 'success');
        }
    }
    
    /**
     * Show task edit modal
     */
    showTaskModal(taskId = null, isMilestone = false) {
        const modal = document.getElementById('taskModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('taskForm');
        
        form.reset();
        
        if (taskId) {
            // Edit existing task
            const task = this.taskManager.getTask(taskId);
            if (!task) return;
            
            title.textContent = 'Edit Task';
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskName').value = task.name;
            document.getElementById('taskStart').value = this.formatDateForInput(task.startDate);
            document.getElementById('taskDuration').value = task.duration;
            document.getElementById('taskPercent').value = task.percentComplete;
            document.getElementById('taskMilestone').checked = task.isMilestone;
            document.getElementById('taskPredecessors').value = task.getPredecessorString();
            document.getElementById('taskNotes').value = task.notes || '';
        } else {
            // Add new task
            title.textContent = isMilestone ? 'Add Milestone' : 'Add Task';
            document.getElementById('taskId').value = '';
            document.getElementById('taskName').value = '';
            document.getElementById('taskStart').value = this.formatDateForInput(new Date());
            document.getElementById('taskDuration').value = isMilestone ? 0 : 1;
            document.getElementById('taskPercent').value = 0;
            document.getElementById('taskMilestone').checked = isMilestone;
            document.getElementById('taskPredecessors').value = '';
            document.getElementById('taskNotes').value = '';
            
            if (isMilestone) {
                document.getElementById('taskDuration').disabled = true;
            } else {
                document.getElementById('taskDuration').disabled = false;
            }
        }
        
        modal.classList.add('active');
    }
    
    /**
     * Hide task modal
     */
    hideTaskModal() {
        document.getElementById('taskModal').classList.remove('active');
    }
    
    /**
     * Save task from modal
     */
    saveTaskFromModal() {
        const taskId = document.getElementById('taskId').value;
        const name = document.getElementById('taskName').value.trim();
        const startDate = new Date(document.getElementById('taskStart').value);
        const duration = parseInt(document.getElementById('taskDuration').value);
        const percentComplete = parseInt(document.getElementById('taskPercent').value);
        const isMilestone = document.getElementById('taskMilestone').checked;
        const predecessorsStr = document.getElementById('taskPredecessors').value.trim();
        const notes = document.getElementById('taskNotes').value.trim();
        
        // Validation
        if (!name) {
            this.showToast('Task name is required', 'error');
            return;
        }
        
        if (!isMilestone && duration < 1) {
            this.showToast('Duration must be at least 1 day', 'error');
            return;
        }
        
        // Parse predecessors
        const predecessors = this.parsePredecessors(predecessorsStr);
        
        try {
            if (taskId) {
                // Update existing task
                const task = this.taskManager.getTask(taskId);
                task.name = name;
                task.startDate = startDate;
                task.duration = isMilestone ? 0 : duration;
                task.endDate = task.calculateEndDate();
                task.percentComplete = percentComplete;
                task.isMilestone = isMilestone;
                task.predecessors = predecessors;
                task.notes = notes;
            } else {
                // Create new task
                const task = new Task({
                    name,
                    startDate,
                    duration: isMilestone ? 0 : duration,
                    percentComplete,
                    isMilestone,
                    predecessors,
                    notes
                });
                this.taskManager.addTask(task);
            }
            
            this.hideTaskModal();
            this.scheduleChanged();
            this.calculate();
            this.render();
            this.showToast(taskId ? 'Task updated' : 'Task added', 'success');
            
        } catch (e) {
            this.showToast(e.message, 'error');
        }
    }
    
    /**
     * Parse predecessors string
     */
    parsePredecessors(str) {
        if (!str) return [];
        
        const predecessors = [];
        const parts = str.split(';');
        
        parts.forEach(part => {
            const trimmed = part.trim();
            if (!trimmed) return;
            
            const subParts = trimmed.split(',');
            if (subParts.length >= 2) {
                predecessors.push({
                    taskId: subParts[0].trim(),
                    type: (subParts[1].trim() || 'FS').toUpperCase(),
                    lag: parseInt(subParts[2]) || 0
                });
            }
        });
        
        return predecessors;
    }
    
    /**
     * Show load project modal
     */
    showLoadModal() {
        const modal = document.getElementById('loadModal');
        const list = document.getElementById('savedProjectsList');
        
        list.innerHTML = '';
        
        const projects = this.storage.getProjectList();
        
        if (projects.length === 0) {
            list.innerHTML = '<p>No saved projects found.</p>';
        } else {
            projects.forEach(project => {
                const item = document.createElement('div');
                item.className = 'saved-project-item';
                
                const info = document.createElement('div');
                info.className = 'saved-project-info';
                info.innerHTML = `
                    <span class="saved-project-name">${project.name}</span>
                    <span class="saved-project-date">${project.taskCount} tasks • Saved ${new Date(project.savedAt).toLocaleString()}</span>
                `;
                
                const loadBtn = document.createElement('button');
                loadBtn.className = 'btn btn-primary';
                loadBtn.textContent = 'Load';
                loadBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.loadProject(project.name);
                    this.hideLoadModal();
                });
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-danger';
                deleteBtn.textContent = 'Delete';
                deleteBtn.style.marginLeft = '8px';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Delete project "${project.name}"?`)) {
                        this.storage.deleteProject(project.name);
                        this.showLoadModal();
                    }
                });
                
                item.appendChild(info);
                item.appendChild(loadBtn);
                item.appendChild(deleteBtn);
                
                item.addEventListener('click', () => {
                    this.loadProject(project.name);
                    this.hideLoadModal();
                });
                
                list.appendChild(item);
            });
        }
        
        modal.classList.add('active');
    }
    
    /**
     * Hide load modal
     */
    hideLoadModal() {
        document.getElementById('loadModal').classList.remove('active');
    }
    
    /**
     * Load project
     */
    loadProject(projectName) {
        try {
            const data = this.storage.loadProject(projectName);
            this.taskManager.loadFromData(data);
            this.calculate();
            this.render();
            this.showToast('Project loaded: ' + projectName, 'success');
        } catch (e) {
            this.showToast('Failed to load project: ' + e.message, 'error');
        }
    }
    
    /**
     * Save current project
     */
    saveCurrentProject() {
        const name = prompt('Enter project name:', this.taskManager.projectName);
        
        if (!name) return;
        
        try {
            this.taskManager.projectName = name;
            const data = this.taskManager.exportToData();
            this.storage.saveProject(name, data);
            this.isDirty = false;
            this.showToast('Project saved', 'success');
        } catch (e) {
            this.showToast('Failed to save: ' + e.message, 'error');
        }
    }
    
    /**
     * Show import modal
     */
    showImportModal() {
        document.getElementById('importModal').classList.add('active');
        document.getElementById('csvFile').value = '';
        document.getElementById('importPreview').innerHTML = '';
    }
    
    /**
     * Hide import modal
     */
    hideImportModal() {
        document.getElementById('importModal').classList.remove('active');
    }
    
    /**
     * Preview CSV before import
     */
    previewCSV(file) {
        if (!file) return;
        
        const preview = document.getElementById('importPreview');
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            
            // Validate
            const validation = this.csvHandler.validateCSV(content);
            
            if (validation.valid) {
                preview.innerHTML = '<p style="color: green;">✓ CSV looks valid. Click Import to proceed.</p>';
                preview.dataset.content = content;
            } else {
                preview.innerHTML = '<p style="color: red;">⚠ Validation errors:</p>' +
                    validation.errors.map(err => `<p style="color: red; font-size: 12px;">• ${err}</p>`).join('');
                preview.dataset.content = content;
            }
        };
        reader.readAsText(file);
    }
    
    /**
     * Confirm CSV import
     */
    confirmImport() {
        const preview = document.getElementById('importPreview');
        const content = preview.dataset.content;
        
        if (!content) {
            this.showToast('Please select a CSV file first', 'warning');
            return;
        }
        
        try {
            this.taskManager.clear();
            this.csvHandler.importFromCSV(content);
            this.calculate();
            this.render();
            this.hideImportModal();
            this.showToast('CSV imported successfully', 'success');
        } catch (e) {
            this.showToast('Import failed: ' + e.message, 'error');
        }
    }
    
    /**
     * Export to CSV
     */
    exportCSV() {
        try {
            const csv = this.csvHandler.exportToCSV();
            const filename = `${this.taskManager.projectName.replace(/[^a-z0-9]/gi, '_')}_tasks.csv`;
            this.csvHandler.downloadCSV(csv, filename);
            this.showToast('CSV exported successfully', 'success');
        } catch (e) {
            this.showToast('Export failed: ' + e.message, 'error');
        }
    }
    
    /**
     * Create sample project
     */
    createSampleProject() {
        this.taskManager.createSampleProject();
        this.calculate();
        this.render();
    }
    
    /**
     * Calculate schedule
     */
    calculate() {
        try {
            this.calculator.calculate();
            return true;
        } catch (e) {
            this.showToast('Schedule error: ' + e.message, 'error');
            return false;
        }
    }
    
    /**
     * Mark schedule as changed
     */
    scheduleChanged() {
        this.isDirty = true;
    }
    
    /**
     * Update status bar
     */
    updateStatusBar() {
        document.getElementById('projectName').textContent = this.taskManager.projectName;
        
        const startDate = this.calculator.getProjectStartDate();
        const endDate = this.calculator.getProjectEndDate();
        const duration = this.calculator.getProjectDuration();
        const taskCount = this.taskManager.getTaskCount();
        const criticalPercent = this.calculator.getCriticalPathPercentage();
        
        document.getElementById('projectStart').textContent = this.formatDateShort(startDate);
        document.getElementById('projectFinish').textContent = this.formatDateShort(endDate);
        document.getElementById('projectDuration').textContent = duration + ' days';
        document.getElementById('taskCount').textContent = taskCount;
        document.getElementById('criticalPercent').textContent = criticalPercent + '%';
    }
    
    /**
     * Update zoom level display
     */
    updateZoomDisplay() {
        document.getElementById('zoomLevel').textContent = this.ganttRenderer.getZoomLevelText();
    }
    
    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    /**
     * Format date for display
     */
    formatDateShort(date) {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    
    /**
     * Format date for input field
     */
    formatDateForInput(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SchedulerApp();
});
