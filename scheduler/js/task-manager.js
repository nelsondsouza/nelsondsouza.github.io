/**
 * Task Manager - Handles all CRUD operations for tasks
 */

class Task {
    constructor(options = {}) {
        this.id = options.id || this.generateId();
        this.name = options.name || 'New Task';
        this.startDate = options.startDate ? new Date(options.startDate) : new Date();
        this.duration = options.duration || 1;
        this.endDate = options.endDate ? new Date(options.endDate) : this.calculateEndDate();
        this.percentComplete = options.percentComplete || 0;
        this.isMilestone = options.isMilestone || false;
        this.isSummary = options.isSummary || false;
        this.parentId = options.parentId || null;
        this.predecessors = options.predecessors || [];
        this.notes = options.notes || '';
        
        // Calculated fields (set by schedule-calc.js)
        this.earlyStart = null;
        this.earlyFinish = null;
        this.lateStart = null;
        this.lateFinish = null;
        this.freeFloat = 0;
        this.totalFloat = 0;
        this.isCritical = false;
    }
    
    generateId() {
        return 'T' + Date.now().toString(36).toUpperCase();
    }
    
    calculateEndDate() {
        const end = new Date(this.startDate);
        end.setDate(end.getDate() + this.duration);
        return end;
    }
    
    setStartDate(date) {
        this.startDate = new Date(date);
        this.endDate = this.calculateEndDate();
    }
    
    setDuration(duration) {
        this.duration = Math.max(1, duration);
        this.endDate = this.calculateEndDate();
    }
    
    setEndDate(date) {
        this.endDate = new Date(date);
        const diff = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
        this.duration = Math.max(1, diff);
    }
    
    addPredecessor(taskId, type = 'FS', lag = 0) {
        // Check if predecessor already exists
        const exists = this.predecessors.some(p => p.taskId === taskId && p.type === type);
        if (!exists) {
            this.predecessors.push({ taskId, type, lag });
        }
    }
    
    removePredecessor(taskId, type = null) {
        if (type) {
            this.predecessors = this.predecessors.filter(p => !(p.taskId === taskId && p.type === type));
        } else {
            this.predecessors = this.predecessors.filter(p => p.taskId !== taskId);
        }
    }
    
    getPredecessorString() {
        return this.predecessors.map(p => `${p.taskId},${p.type},${p.lag}`).join('; ');
    }
    
    clone() {
        return new Task(JSON.parse(JSON.stringify(this)));
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            startDate: this.startDate.toISOString(),
            duration: this.duration,
            endDate: this.endDate.toISOString(),
            percentComplete: this.percentComplete,
            isMilestone: this.isMilestone,
            isSummary: this.isSummary,
            parentId: this.parentId,
            predecessors: this.predecessors,
            notes: this.notes,
            earlyStart: this.earlyStart ? this.earlyStart.toISOString() : null,
            earlyFinish: this.earlyFinish ? this.earlyFinish.toISOString() : null,
            lateStart: this.lateStart ? this.lateStart.toISOString() : null,
            lateFinish: this.lateFinish ? this.lateFinish.toISOString() : null,
            freeFloat: this.freeFloat,
            totalFloat: this.totalFloat,
            isCritical: this.isCritical
        };
    }
    
    static fromJSON(json) {
        const task = new Task({
            id: json.id,
            name: json.name,
            startDate: json.startDate,
            duration: json.duration,
            endDate: json.endDate,
            percentComplete: json.percentComplete,
            isMilestone: json.isMilestone,
            isSummary: json.isSummary,
            parentId: json.parentId,
            predecessors: json.predecessors || [],
            notes: json.notes || ''
        });
        task.earlyStart = json.earlyStart ? new Date(json.earlyStart) : null;
        task.earlyFinish = json.earlyFinish ? new Date(json.earlyFinish) : null;
        task.lateStart = json.lateStart ? new Date(json.lateStart) : null;
        task.lateFinish = json.lateFinish ? new Date(json.lateFinish) : null;
        task.freeFloat = json.freeFloat || 0;
        task.totalFloat = json.totalFloat || 0;
        task.isCritical = json.isCritical || false;
        return task;
    }
}

class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.projectName = 'Untitled Project';
        this.projectStartDate = new Date();
    }
    
    addTask(task) {
        if (this.tasks.has(task.id)) {
            throw new Error(`Task with ID ${task.id} already exists`);
        }
        this.tasks.set(task.id, task);
        return task;
    }
    
    updateTask(taskId, updates) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        
        Object.assign(task, updates);
        
        // Recalculate end date if start or duration changed
        if (updates.startDate) {
            task.endDate = task.calculateEndDate();
        }
        if (updates.duration) {
            task.endDate = task.calculateEndDate();
        }
        
        return task;
    }
    
    deleteTask(taskId) {
        if (!this.tasks.has(taskId)) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        
        // Remove this task from all predecessors
        this.tasks.forEach(task => {
            task.removePredecessor(taskId);
        });
        
        // Remove children (tasks with this as parent)
        this.tasks.forEach(task => {
            if (task.parentId === taskId) {
                task.parentId = null;
            }
        });
        
        return this.tasks.delete(taskId);
    }
    
    getTask(taskId) {
        return this.tasks.get(taskId);
    }
    
    getAllTasks() {
        return Array.from(this.tasks.values());
    }
    
    getTaskById(taskId) {
        return this.tasks.get(taskId);
    }
    
    getTasksSorted() {
        return this.getAllTasks().sort((a, b) => a.startDate - b.startDate);
    }
    
    getTaskCount() {
        return this.tasks.size;
    }
    
    clear() {
        this.tasks.clear();
        this.projectName = 'Untitled Project';
        this.projectStartDate = new Date();
    }
    
    loadFromData(data) {
        this.clear();
        this.projectName = data.projectName || 'Untitled Project';
        this.projectStartDate = data.projectStartDate ? new Date(data.projectStartDate) : new Date();
        
        if (data.tasks && Array.isArray(data.tasks)) {
            data.tasks.forEach(taskData => {
                const task = Task.fromJSON(taskData);
                this.tasks.set(task.id, task);
            });
        }
    }
    
    exportToData() {
        return {
            projectName: this.projectName,
            projectStartDate: this.projectStartDate.toISOString(),
            tasks: this.getAllTasks().map(t => t.toJSON()),
            exportedAt: new Date().toISOString()
        };
    }
    
    // Validate task data
    validate() {
        const errors = [];
        
        this.tasks.forEach(task => {
            // Check for duplicate IDs (already handled by Map)
            
            // Validate predecessor references
            task.predecessors.forEach(pred => {
                if (!this.tasks.has(pred.taskId)) {
                    errors.push(`Task ${task.id}: Predecessor ${pred.taskId} does not exist`);
                }
            });
            
            // Validate duration
            if (task.duration < 1) {
                errors.push(`Task ${task.id}: Duration must be at least 1 day`);
            }
            
            // Validate percent complete
            if (task.percentComplete < 0 || task.percentComplete > 100) {
                errors.push(`Task ${task.id}: Percent complete must be between 0 and 100`);
            }
            
            // Validate dependency type
            const validTypes = ['FS', 'SS', 'FF', 'SF'];
            task.predecessors.forEach(pred => {
                if (!validTypes.includes(pred.type)) {
                    errors.push(`Task ${task.id}: Invalid dependency type "${pred.type}"`);
                }
            });
        });
        
        return errors;
    }
    
    // Create sample project for demo
    createSampleProject() {
        this.clear();
        this.projectName = 'Sample Construction Project';
        this.projectStartDate = new Date();
        this.projectStartDate.setHours(0, 0, 0, 0);
        
        const today = new Date(this.projectStartDate);
        
        const tasks = [
            { id: 'T1', name: 'Project Planning', startDate: new Date(today), duration: 5, predecessors: [] },
            { id: 'T2', name: 'Site Preparation', startDate: new Date(today), duration: 7, predecessors: [{ taskId: 'T1', type: 'FS', lag: 0 }] },
            { id: 'T3', name: 'Foundation Work', startDate: new Date(today), duration: 10, predecessors: [{ taskId: 'T2', type: 'FS', lag: 0 }] },
            { id: 'T4', name: 'Structural Framing', startDate: new Date(today), duration: 14, predecessors: [{ taskId: 'T3', type: 'FS', lag: 0 }] },
            { id: 'T5', name: 'Roofing', startDate: new Date(today), duration: 5, predecessors: [{ taskId: 'T4', type: 'FS', lag: 0 }] },
            { id: 'T6', name: 'Exterior Finishing', startDate: new Date(today), duration: 10, predecessors: [{ taskId: 'T5', type: 'FS', lag: 0 }] },
            { id: 'T7', name: 'Electrical Rough-In', startDate: new Date(today), duration: 7, predecessors: [{ taskId: 'T4', type: 'SS', lag: 3 }] },
            { id: 'T8', name: 'Plumbing Rough-In', startDate: new Date(today), duration: 7, predecessors: [{ taskId: 'T4', type: 'SS', lag: 5 }] },
            { id: 'T9', name: 'HVAC Installation', startDate: new Date(today), duration: 5, predecessors: [{ taskId: 'T7', type: 'FF', lag: -2 }] },
            { id: 'T10', name: 'Interior Framing', startDate: new Date(today), duration: 8, predecessors: [{ taskId: 'T4', type: 'FS', lag: 7 }] },
            { id: 'T11', name: 'Drywall Installation', startDate: new Date(today), duration: 6, predecessors: [{ taskId: 'T10', type: 'FS', lag: 0 }] },
            { id: 'T12', name: 'Electrical Finish', startDate: new Date(today), duration: 4, predecessors: [{ taskId: 'T11', type: 'FS', lag: 0 }] },
            { id: 'T13', name: 'Plumbing Finish', startDate: new Date(today), duration: 4, predecessors: [{ taskId: 'T11', type: 'FS', lag: 0 }] },
            { id: 'T14', name: 'Painting', startDate: new Date(today), duration: 8, predecessors: [{ taskId: 'T11', type: 'FS', lag: 2 }] },
            { id: 'T15', name: 'Flooring', startDate: new Date(today), duration: 5, predecessors: [{ taskId: 'T14', type: 'FS', lag: 0 }] },
            { id: 'T16', name: 'Fixtures & Appliances', startDate: new Date(today), duration: 5, predecessors: [{ taskId: 'T12', type: 'FS', lag: 0 }, { taskId: 'T13', type: 'FS', lag: 0 }, { taskId: 'T15', type: 'FS', lag: 0 }] },
            { id: 'T17', name: 'Final Inspection', startDate: new Date(today), duration: 2, predecessors: [{ taskId: 'T6', type: 'FS', lag: 0 }, { taskId: 'T9', type: 'FS', lag: 0 }, { taskId: 'T16', type: 'FS', lag: 0 }] },
            { id: 'T18', name: 'Project Closeout', startDate: new Date(today), duration: 3, predecessors: [{ taskId: 'T17', type: 'FS', lag: 0 }] }
        ];
        
        tasks.forEach(taskData => {
            const task = new Task(taskData);
            this.tasks.set(task.id, task);
        });
        
        return this.tasks;
    }
}

// Export for use in other modules
window.Task = Task;
window.TaskManager = TaskManager;
