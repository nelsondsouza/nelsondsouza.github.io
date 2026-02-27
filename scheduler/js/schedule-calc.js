/**
 * Schedule Calculator - Critical Path Method (CPM) Implementation
 * Includes forward pass, backward pass, float calculation, and circular dependency detection
 */

class ScheduleCalculator {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }
    
    /**
     * Main scheduling function - runs all CPM calculations
     */
    calculate() {
        // Reset calculated fields
        this.resetCalculatedFields();
        
        // Check for circular dependencies
        const cycle = this.detectCircularDependencies();
        if (cycle) {
            throw new Error(`Circular dependency detected: ${cycle.join(' → ')}`);
        }
        
        // Perform forward pass
        this.forwardPass();
        
        // Perform backward pass
        this.backwardPass();
        
        // Calculate float
        this.calculateFloat();
        
        // Identify critical path
        this.identifyCriticalPath();
        
        return true;
    }
    
    /**
     * Reset all calculated fields
     */
    resetCalculatedFields() {
        const tasks = this.taskManager.getAllTasks();
        tasks.forEach(task => {
            task.earlyStart = null;
            task.earlyFinish = null;
            task.lateStart = null;
            task.lateFinish = null;
            task.freeFloat = 0;
            task.totalFloat = 0;
            task.isCritical = false;
        });
    }
    
    /**
     * Detect circular dependencies using DFS
     * Returns array of task IDs forming the cycle, or null if no cycle
     */
    detectCircularDependencies() {
        const visited = new Set();
        const recursionStack = new Set();
        const path = [];
        
        const tasks = this.taskManager.getAllTasks();
        
        const dfs = (taskId) => {
            visited.add(taskId);
            recursionStack.add(taskId);
            path.push(taskId);
            
            const task = this.taskManager.getTask(taskId);
            if (!task) {
                path.pop();
                recursionStack.delete(taskId);
                return false;
            }
            
            // Check all successor relationships
            tasks.forEach(successor => {
                if (successor.predecessors.some(p => p.taskId === taskId)) {
                    // This task is a predecessor of successor
                    if (recursionStack.has(successor.id)) {
                        // Found a cycle
                        const cycleStart = path.indexOf(successor.id);
                        return path.slice(cycleStart).concat(successor.id);
                    }
                    if (!visited.has(successor.id)) {
                        const result = dfs(successor.id);
                        if (result) return result;
                    }
                }
            });
            
            path.pop();
            recursionStack.delete(taskId);
            return false;
        };
        
        // Check each task
        for (const task of tasks) {
            if (!visited.has(task.id)) {
                const cycle = dfs(task.id);
                if (cycle) return cycle;
            }
        }
        
        return null;
    }
    
    /**
     * Forward Pass - Calculate Early Start and Early Finish
     */
    forwardPass() {
        const tasks = this.taskManager.getAllTasks();
        const sortedTasks = this.topologicalSort();
        
        sortedTasks.forEach(taskId => {
            const task = this.taskManager.getTask(taskId);
            if (!task) return;
            
            let maxPredecessorEF = new Date(task.startDate);
            
            // Check all predecessors
            task.predecessors.forEach(pred => {
                const predTask = this.taskManager.getTask(pred.taskId);
                if (!predTask) return;
                
                let predEF = predTask.earlyFinish;
                if (!predEF) predEF = predTask.startDate;
                
                // Apply lag
                const lag = pred.lag || 0;
                const adjustedEF = new Date(predEF);
                adjustedEF.setDate(adjustedEF.getDate() + lag);
                
                // Calculate based on dependency type
                let calculatedES;
                
                switch (pred.type) {
                    case 'FS': // Finish-to-Start
                        calculatedES = new Date(adjustedEF);
                        break;
                    case 'SS': // Start-to-Start
                        calculatedES = new Date(predTask.earlyStart || predTask.startDate);
                        calculatedES.setDate(calculatedES.getDate() + lag);
                        break;
                    case 'FF': // Finish-to-Finish
                        calculatedES = new Date(adjustedEF);
                        calculatedES.setDate(calculatedES.getDate() - task.duration);
                        break;
                    case 'SF': // Start-to-Finish
                        calculatedES = new Date(predTask.startDate);
                        calculatedES.setDate(calculatedES.getDate() + lag - task.duration);
                        break;
                    default:
                        calculatedES = new Date(adjustedEF);
                }
                
                if (calculatedES > maxPredecessorEF) {
                    maxPredecessorEF = calculatedES;
                }
            });
            
            // Set Early Start and Early Finish
            task.earlyStart = new Date(maxPredecessorEF);
            task.earlyStart.setHours(0, 0, 0, 0);
            
            task.earlyFinish = new Date(task.earlyStart);
            task.earlyFinish.setDate(task.earlyFinish.getDate() + task.duration);
            
            // Handle milestone
            if (task.isMilestone) {
                task.earlyFinish = new Date(task.earlyStart);
            }
        });
    }
    
    /**
     * Backward Pass - Calculate Late Start and Late Finish
     */
    backwardPass() {
        const tasks = this.taskManager.getAllTasks();
        
        // Find project end date (max Early Finish)
        let projectEnd = new Date();
        tasks.forEach(task => {
            const ef = task.earlyFinish || task.endDate;
            if (ef > projectEnd) {
                projectEnd = new Date(ef);
            }
        });
        
        // Initialize all tasks with project end date
        tasks.forEach(task => {
            task.lateFinish = new Date(projectEnd);
            task.lateStart = new Date(projectEnd);
            task.lateStart.setDate(task.lateStart.getDate() - task.duration);
            
            if (task.isMilestone) {
                task.lateStart = new Date(projectEnd);
            }
        });
        
        // Process in reverse topological order
        const sortedTasks = this.topologicalSort().reverse();
        
        sortedTasks.forEach(taskId => {
            const task = this.taskManager.getTask(taskId);
            if (!task) return;
            
            // Find all tasks that have this task as a predecessor
            const successors = this.getSuccessors(taskId);
            
            if (successors.length === 0) {
                // This is an end task - late finish = project end
                task.lateFinish = new Date(projectEnd);
                task.lateStart = new Date(projectEnd);
                task.lateStart.setDate(task.lateStart.getDate() - task.duration);
                if (task.isMilestone) {
                    task.lateStart = new Date(projectEnd);
                }
            } else {
                // Find minimum LS among all successors
                let minSuccessorLS = new Date(8640000000000000); // Max date
                
                successors.forEach(successor => {
                    const successorTask = this.taskManager.getTask(successor.taskId);
                    if (!successorTask) return;
                    
                    let successorLS = successorTask.lateStart;
                    if (!successorLS) successorLS = successorTask.startDate;
                    
                    // Apply lag from successor's perspective
                    const lag = successor.lag || 0;
                    const adjustedLS = new Date(successorLS);
                    adjustedLS.setDate(adjustedLS.getDate() - lag);
                    
                    let calculatedLF;
                    
                    switch (successor.type) {
                        case 'FS': // Finish-to-Start
                            calculatedLF = new Date(adjustedLS);
                            break;
                        case 'SS': // Start-to-Start
                            calculatedLF = new Date(successorTask.lateFinish || successorTask.endDate);
                            calculatedLF.setDate(calculatedLF.getDate() + lag);
                            break;
                        case 'FF': // Finish-to-Finish
                            calculatedLF = new Date(adjustedLS);
                            break;
                        case 'SF': // Start-to-Finish
                            calculatedLF = new Date(successorTask.startDate);
                            calculatedLF.setDate(calculatedLF.getDate() + lag + task.duration);
                            break;
                        default:
                            calculatedLF = new Date(adjustedLS);
                    }
                    
                    if (calculatedLF < minSuccessorLS) {
                        minSuccessorLS = calculatedLF;
                    }
                });
                
                task.lateFinish = new Date(minSuccessorLS);
                task.lateStart = new Date(task.lateFinish);
                task.lateStart.setDate(task.lateStart.getDate() - task.duration);
                
                if (task.isMilestone) {
                    task.lateStart = new Date(task.lateFinish);
                }
            }
        });
    }
    
    /**
     * Get all successors of a task
     */
    getSuccessors(taskId) {
        const tasks = this.taskManager.getAllTasks();
        const successors = [];
        
        tasks.forEach(task => {
            task.predecessors.forEach(pred => {
                if (pred.taskId === taskId) {
                    successors.push({
                        taskId: task.id,
                        type: pred.type,
                        lag: pred.lag
                    });
                }
            });
        });
        
        return successors;
    }
    
    /**
     * Topological sort of tasks based on dependencies
     */
    topologicalSort() {
        const tasks = this.taskManager.getAllTasks();
        const inDegree = new Map();
        const graph = new Map();
        
        // Initialize
        tasks.forEach(task => {
            inDegree.set(task.id, 0);
            graph.set(task.id, []);
        });
        
        // Build graph
        tasks.forEach(task => {
            task.predecessors.forEach(pred => {
                if (this.taskManager.getTask(pred.taskId)) {
                    graph.get(pred.taskId).push(task.id);
                    inDegree.set(task.id, inDegree.get(task.id) + 1);
                }
            });
        });
        
        // Kahn's algorithm
        const queue = [];
        inDegree.forEach((degree, taskId) => {
            if (degree === 0) {
                queue.push(taskId);
            }
        });
        
        const sorted = [];
        while (queue.length > 0) {
            const taskId = queue.shift();
            sorted.push(taskId);
            
            const neighbors = graph.get(taskId) || [];
            neighbors.forEach(neighbor => {
                const newDegree = inDegree.get(neighbor) - 1;
                inDegree.set(neighbor, newDegree);
                if (newDegree === 0) {
                    queue.push(neighbor);
                }
            });
        }
        
        // If sorted.length != tasks.length, there's a cycle (but we already check for that)
        return sorted;
    }
    
    /**
     * Calculate Free Float and Total Float
     */
    calculateFloat() {
        const tasks = this.taskManager.getAllTasks();
        
        tasks.forEach(task => {
            // Total Float = Late Start - Early Start
            if (task.lateStart && task.earlyStart) {
                task.totalFloat = Math.ceil((task.lateStart - task.earlyStart) / (1000 * 60 * 60 * 24));
            }
            
            // Free Float = min(ES of successors) - EF of this task
            const successors = this.getSuccessors(task.id);
            if (successors.length === 0) {
                task.freeFloat = task.totalFloat;
            } else {
                let minSuccessorES = new Date(8640000000000000);
                
                successors.forEach(successor => {
                    const successorTask = this.taskManager.getTask(successor.taskId);
                    if (!successorTask) return;
                    
                    let successorES = successorTask.earlyStart;
                    if (!successorES) successorES = successorTask.startDate;
                    
                    // Apply lag from successor's perspective
                    const lag = successor.lag || 0;
                    const adjustedSuccessorES = new Date(successorES);
                    adjustedSuccessorES.setDate(adjustedSuccessorES.getDate() + lag);
                    
                    if (successor.type === 'FS' || successor.type === 'SS') {
                        if (adjustedSuccessorES < minSuccessorES) {
                            minSuccessorES = adjustedSuccessorES;
                        }
                    }
                });
                
                const ef = task.earlyFinish || task.endDate;
                task.freeFloat = Math.ceil((minSuccessorES - ef) / (1000 * 60 * 60 * 24));
                task.freeFloat = Math.max(0, task.freeFloat);
            }
        });
    }
    
    /**
     * Identify critical path (tasks with zero total float)
     */
    identifyCriticalPath() {
        const tasks = this.taskManager.getAllTasks();
        
        tasks.forEach(task => {
            // Tasks with zero total float are on the critical path
            // Also consider tasks with very small float (<= 1 day) as nearly critical
            task.isCritical = task.totalFloat <= 0;
        });
        
        return tasks.filter(t => t.isCritical);
    }
    
    /**
     * Get project start date (earliest task start)
     */
    getProjectStartDate() {
        const tasks = this.taskManager.getAllTasks();
        let minStart = new Date(8640000000000000);
        
        tasks.forEach(task => {
            if (task.startDate < minStart) {
                minStart = new Date(task.startDate);
            }
        });
        
        return minStart.getFullYear() < 4000 ? minStart : new Date();
    }
    
    /**
     * Get project end date (latest task end)
     */
    getProjectEndDate() {
        const tasks = this.taskManager.getAllTasks();
        let maxEnd = new Date(0);
        
        tasks.forEach(task => {
            const endDate = task.earlyFinish || task.endDate;
            if (endDate > maxEnd) {
                maxEnd = new Date(endDate);
            }
        });
        
        return maxEnd.getTime() > 0 ? maxEnd : new Date();
    }
    
    /**
     * Get project duration in days
     */
    getProjectDuration() {
        const start = this.getProjectStartDate();
        const end = this.getProjectEndDate();
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }
    
    /**
     * Get critical path percentage
     */
    getCriticalPathPercentage() {
        const tasks = this.taskManager.getAllTasks();
        if (tasks.length === 0) return 0;
        
        const criticalCount = tasks.filter(t => t.isCritical).length;
        return Math.round((criticalCount / tasks.length) * 100);
    }
    
    /**
     * Auto-schedule all tasks based on dependencies
     */
    autoSchedule() {
        const tasks = this.taskManager.getAllTasks();
        
        // Clear all dates first
        tasks.forEach(task => {
            task.earlyStart = null;
            task.earlyFinish = null;
            task.lateStart = null;
            task.lateFinish = null;
        });
        
        // Re-run full calculation
        return this.calculate();
    }
}

// Export for use in other modules
window.ScheduleCalculator = ScheduleCalculator;
