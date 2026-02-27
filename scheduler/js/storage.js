/**
 * Storage Manager - localStorage persistence
 */

class StorageManager {
    constructor(appName = 'projectScheduler') {
        this.appName = appName;
        this.storageKey = `${this.appName}_projects`;
        this.lastProjectKey = `${this.appName}_lastProject`;
    }
    
    /**
     * Save project to localStorage
     */
    saveProject(projectName, taskManagerData) {
        const projects = this.getAllProjects();
        
        const project = {
            name: projectName,
            data: taskManagerData,
            savedAt: new Date().toISOString()
        };
        
        // Update or add project
        const existingIndex = projects.findIndex(p => p.name === projectName);
        if (existingIndex !== -1) {
            projects[existingIndex] = project;
        } else {
            projects.push(project);
        }
        
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(projects));
            localStorage.setItem(this.lastProjectKey, projectName);
            return true;
        } catch (e) {
            console.error('Failed to save project:', e);
            throw new Error('Failed to save project. Storage may be full.');
        }
    }
    
    /**
     * Load project from localStorage
     */
    loadProject(projectName) {
        const projects = this.getAllProjects();
        const project = projects.find(p => p.name === projectName);
        
        if (!project) {
            throw new Error(`Project "${projectName}" not found`);
        }
        
        return project.data;
    }
    
    /**
     * Delete project from localStorage
     */
    deleteProject(projectName) {
        const projects = this.getAllProjects();
        const filteredProjects = projects.filter(p => p.name !== projectName);
        
        localStorage.setItem(this.storageKey, JSON.stringify(filteredProjects));
        
        // If deleted the last loaded project, clear last project
        const lastProject = localStorage.getItem(this.lastProjectKey);
        if (lastProject === projectName) {
            localStorage.removeItem(this.lastProjectKey);
        }
        
        return true;
    }
    
    /**
     * Get all saved projects
     */
    getAllProjects() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load projects:', e);
            return [];
        }
    }
    
    /**
     * Get list of project names with metadata
     */
    getProjectList() {
        const projects = this.getAllProjects();
        return projects.map(p => ({
            name: p.name,
            savedAt: p.savedAt,
            taskCount: p.data.tasks ? p.data.tasks.length : 0
        }));
    }
    
    /**
     * Get last loaded project name
     */
    getLastProjectName() {
        return localStorage.getItem(this.lastProjectKey);
    }
    
    /**
     * Clear all saved projects
     */
    clearAllProjects() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.lastProjectKey);
        return true;
    }
    
    /**
     * Check if storage is available
     */
    isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * Get storage usage info
     */
    getStorageInfo() {
        let totalSize = 0;
        
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }
        
        return {
            used: totalSize,
            usedFormatted: this.formatBytes(totalSize),
            available: true // Can't get actual limit in browser
        };
    }
    
    /**
     * Format bytes to human readable
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    /**
     * Auto-save functionality
     */
    setupAutoSave(schedulerApp, intervalMs = 30000) {
        // Clear existing interval if any
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        this.autoSaveInterval = setInterval(() => {
            if (schedulerApp && schedulerApp.taskManager) {
                const data = schedulerApp.taskManager.exportToData();
                const projectName = schedulerApp.taskManager.projectName;
                
                // Don't auto-save empty projects
                if (data.tasks && data.tasks.length > 0) {
                    try {
                        this.saveProject(projectName + ' (Auto-save)', data);
                        console.log('Auto-saved project:', projectName);
                    } catch (e) {
                        console.warn('Auto-save failed:', e);
                    }
                }
            }
        }, intervalMs);
        
        return this.autoSaveInterval;
    }
    
    /**
     * Stop auto-save
     */
    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }
    
    /**
     * Export project to JSON file
     */
    exportToJSON(taskManagerData) {
        return JSON.stringify(taskManagerData, null, 2);
    }
    
    /**
     * Import project from JSON file
     */
    importFromJSON(jsonContent) {
        try {
            const data = JSON.parse(jsonContent);
            
            // Validate structure
            if (!data.projectName || !data.tasks) {
                throw new Error('Invalid project file format');
            }
            
            return data;
        } catch (e) {
            throw new Error('Failed to parse JSON: ' + e.message);
        }
    }
    
    /**
     * Download project as JSON
     */
    downloadProjectJSON(taskManagerData, filename) {
        const json = this.exportToJSON(taskManagerData);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || `${taskManagerData.projectName}.json`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
}

// Export for use in other modules
window.StorageManager = StorageManager;
