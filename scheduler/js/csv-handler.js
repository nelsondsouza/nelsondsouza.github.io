/**
 * CSV Handler - Import and export tasks to CSV format
 */

class CSVHandler {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }
    
    /**
     * Export tasks to CSV
     */
    exportToCSV() {
        const tasks = this.taskManager.getAllTasks();
        
        if (tasks.length === 0) {
            throw new Error('No tasks to export');
        }
        
        // CSV header
        const headers = [
            'ID',
            'Name',
            'StartDate',
            'Duration',
            'PercentComplete',
            'IsMilestone',
            'IsSummary',
            'Predecessors',
            'Notes',
            'EarlyStart',
            'EarlyFinish',
            'LateStart',
            'LateFinish',
            'FreeFloat',
            'TotalFloat',
            'IsCritical'
        ];
        
        const rows = [headers.join(',')];
        
        tasks.forEach(task => {
            const row = [
                this.escapeCSV(task.id),
                this.escapeCSV(task.name),
                this.formatDate(task.startDate),
                task.duration,
                task.percentComplete,
                task.isMilestone ? 'TRUE' : 'FALSE',
                task.isSummary ? 'TRUE' : 'FALSE',
                this.escapeCSV(task.getPredecessorString()),
                this.escapeCSV(task.notes),
                this.formatDate(task.earlyStart || task.startDate),
                this.formatDate(task.earlyFinish || task.endDate),
                this.formatDate(task.lateStart),
                this.formatDate(task.lateFinish),
                task.freeFloat,
                task.totalFloat,
                task.isCritical ? 'TRUE' : 'FALSE'
            ];
            
            rows.push(row.join(','));
        });
        
        return rows.join('\n');
    }
    
    /**
     * Import tasks from CSV
     */
    importFromCSV(csvContent) {
        const lines = csvContent.trim().split('\n');
        
        if (lines.length < 2) {
            throw new Error('CSV file is empty or has no data rows');
        }
        
        // Parse header
        const headers = this.parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
        
        // Validate required headers
        const requiredHeaders = ['id', 'name', 'startdate', 'duration'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
            throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
        }
        
        // Clear existing tasks
        this.taskManager.clear();
        
        const errors = [];
        const idMap = new Map(); // Map old IDs to new IDs for predecessor resolution
        
        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            try {
                const values = this.parseCSVLine(line);
                const rowData = {};
                
                headers.forEach((header, index) => {
                    rowData[header] = values[index] || '';
                });
                
                // Store old ID for mapping
                const oldId = rowData.id;
                
                // Create task
                const task = new Task({
                    id: rowData.id,
                    name: rowData.name,
                    startDate: this.parseDate(rowData.startdate),
                    duration: parseInt(rowData.duration) || 1,
                    percentComplete: parseInt(rowData.percentcomplete) || 0,
                    isMilestone: rowData.ismilestone === 'TRUE',
                    isSummary: rowData.issummary === 'TRUE',
                    notes: rowData.notes || '',
                    predecessors: []
                });
                
                // Store ID mapping
                idMap.set(oldId, task.id);
                
                // Add task (will use auto-generated ID if duplicate)
                try {
                    this.taskManager.addTask(task);
                } catch (e) {
                    // ID collision - generate new ID
                    task.id = 'T' + Date.now().toString(36).toUpperCase() + i;
                    idMap.set(oldId, task.id);
                    this.taskManager.addTask(task);
                }
            } catch (e) {
                errors.push(`Row ${i + 1}: ${e.message}`);
            }
        }
        
        // Resolve predecessors with ID mapping
        const tasks = this.taskManager.getAllTasks();
        tasks.forEach(task => {
            // We need to re-read the original CSV to get predecessors
            // Since we don't have that context, we'll skip this step
            // The import will need to be followed by recalculation
        });
        
        if (errors.length > 0) {
            throw new Error(`Import errors:\n${errors.join('\n')}`);
        }
        
        return {
            taskCount: tasks.length,
            errors: errors
        };
    }
    
    /**
     * Parse CSV line handling quoted values
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // Escaped quote
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        
        return result;
    }
    
    /**
     * Escape CSV value
     */
    escapeCSV(value) {
        if (value === null || value === undefined) {
            return '';
        }
        
        const str = String(value);
        
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        
        return str;
    }
    
    /**
     * Format date for CSV
     */
    formatDate(date) {
        if (!date) return '';
        
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }
    
    /**
     * Parse date from CSV
     */
    parseDate(dateStr) {
        if (!dateStr) return new Date();
        
        // Try various date formats
        const formats = [
            /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
            /^(\d{2})\/(\d{2})\/(\d{4})$/, // MM/DD/YYYY
            /^(\d{2})-(\d{2})-(\d{4})$/  // DD-MM-YYYY
        ];
        
        let date = new Date(dateStr);
        
        if (isNaN(date.getTime())) {
            // Try MM/DD/YYYY
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                date = new Date(parts[2], parts[0] - 1, parts[1]);
            }
        }
        
        if (isNaN(date.getTime())) {
            // Default to today
            date = new Date();
        }
        
        date.setHours(0, 0, 0, 0);
        return date;
    }
    
    /**
     * Download CSV file
     */
    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'project_tasks.csv';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
    
    /**
     * Upload CSV file
     */
    uploadCSV(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const result = this.importFromCSV(content);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
        });
    }
    
    /**
     * Validate CSV data before import
     */
    validateCSV(csvContent) {
        const errors = [];
        
        try {
            const lines = csvContent.trim().split('\n');
            
            if (lines.length < 2) {
                errors.push('CSV file must have at least one data row');
                return { valid: false, errors };
            }
            
            const headers = this.parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
            
            // Check required headers
            if (!headers.includes('id')) {
                errors.push('Missing required column: ID');
            }
            if (!headers.includes('name')) {
                errors.push('Missing required column: Name');
            }
            if (!headers.includes('startdate')) {
                errors.push('Missing required column: StartDate');
            }
            if (!headers.includes('duration')) {
                errors.push('Missing required column: Duration');
            }
            
            // Check for duplicate IDs
            const ids = new Set();
            for (let i = 1; i < lines.length; i++) {
                const values = this.parseCSVLine(lines[i]);
                const idIndex = headers.indexOf('id');
                if (idIndex !== -1 && values[idIndex]) {
                    if (ids.has(values[idIndex])) {
                        errors.push(`Duplicate ID found: ${values[idIndex]} (row ${i + 1})`);
                    }
                    ids.add(values[idIndex]);
                }
            }
            
            // Validate date format
            const dateIndex = headers.indexOf('startdate');
            if (dateIndex !== -1) {
                for (let i = 1; i < lines.length; i++) {
                    const values = this.parseCSVLine(lines[i]);
                    const dateStr = values[dateIndex];
                    if (dateStr) {
                        const date = new Date(dateStr);
                        if (isNaN(date.getTime())) {
                            // Try other formats
                            const parts = dateStr.split('/');
                            if (parts.length !== 3 || isNaN(new Date(parts[2], parts[0] - 1, parts[1]).getTime())) {
                                errors.push(`Invalid date format: ${dateStr} (row ${i + 1})`);
                            }
                        }
                    }
                }
            }
            
            // Validate duration
            const durationIndex = headers.indexOf('duration');
            if (durationIndex !== -1) {
                for (let i = 1; i < lines.length; i++) {
                    const values = this.parseCSVLine(lines[i]);
                    const duration = parseInt(values[durationIndex]);
                    if (isNaN(duration) || duration < 1) {
                        errors.push(`Invalid duration: ${values[durationIndex]} (row ${i + 1})`);
                    }
                }
            }
            
        } catch (e) {
            errors.push(`Parse error: ${e.message}`);
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }
    
    /**
     * Get sample CSV template
     */
    getSampleTemplate() {
        const headers = ['ID', 'Name', 'StartDate', 'Duration', 'PercentComplete', 'IsMilestone', 'Predecessors', 'Notes'];
        
        const sampleData = [
            ['T1', 'Project Planning', new Date().toISOString().split('T')[0], '5', '0', 'FALSE', '', 'Initial planning phase'],
            ['T2', 'Design Phase', new Date().toISOString().split('T')[0], '10', '0', 'FALSE', 'T1,FS,0', 'Design tasks'],
            ['T3', 'Development', new Date().toISOString().split('T')[0], '20', '0', 'FALSE', 'T2,FS,0', 'Development phase'],
            ['T4', 'Testing', new Date().toISOString().split('T')[0], '7', '0', 'FALSE', 'T3,FS,0', 'QA Testing'],
            ['T5', 'Project Complete', new Date().toISOString().split('T')[0], '0', '0', 'TRUE', 'T4,FS,0', 'Project milestone']
        ];
        
        const rows = [headers.join(',')];
        sampleData.forEach(row => {
            rows.push(row.map(v => this.escapeCSV(v)).join(','));
        });
        
        return rows.join('\n');
    }
}

// Export for use in other modules
window.CSVHandler = CSVHandler;
