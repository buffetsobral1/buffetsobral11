// Cross-Tab Synchronization - Simple communication between admin and main page
class CrossTabSync {
    constructor() {
        this.eventKey = 'buffet_service_sync';
        this.listeners = [];
        
        // Listen for storage events (cross-tab communication)
        window.addEventListener('storage', this.handleStorageEvent.bind(this));
        
        EnvironmentConfig.log('info', 'CrossTabSync initialized');
    }
    
    // Handle storage events from other tabs
    handleStorageEvent(event) {
        if (event.key === this.eventKey && event.newValue) {
            try {
                const syncData = JSON.parse(event.newValue);
                this.notifyListeners(syncData);
                
                EnvironmentConfig.log('debug', 'Received cross-tab sync event', syncData);
                
            } catch (error) {
                EnvironmentConfig.log('warn', 'Error parsing cross-tab sync data', error);
            }
        }
    }
    
    // Send sync event to other tabs
    sendSyncEvent(eventType, data = {}) {
        const syncData = {
            type: eventType,
            data: data,
            timestamp: Date.now(),
            source: window.location.pathname
        };
        
        try {
            localStorage.setItem(this.eventKey, JSON.stringify(syncData));
            
            // Clear the event after a short delay to allow other tabs to process it
            setTimeout(() => {
                localStorage.removeItem(this.eventKey);
            }, 100);
            
            EnvironmentConfig.log('debug', 'Sent cross-tab sync event', syncData);
            
        } catch (error) {
            EnvironmentConfig.log('warn', 'Error sending cross-tab sync event', error);
        }
    }
    
    // Register listener for sync events
    onSyncEvent(callback) {
        this.listeners.push(callback);
        
        // Return function to remove listener
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    
    // Notify all listeners
    notifyListeners(syncData) {
        this.listeners.forEach(listener => {
            try {
                listener(syncData);
            } catch (error) {
                EnvironmentConfig.log('warn', 'Error in sync event listener', error);
            }
        });
    }
    
    // Service-specific sync methods
    notifyServiceCreated(service) {
        this.sendSyncEvent('service_created', { service });
    }
    
    notifyServiceUpdated(service) {
        this.sendSyncEvent('service_updated', { service });
    }
    
    notifyServiceDeleted(serviceId) {
        this.sendSyncEvent('service_deleted', { serviceId });
    }
    
    notifyServiceStatusChanged(serviceId, active) {
        this.sendSyncEvent('service_status_changed', { serviceId, active });
    }
    
    notifyServicesRefresh() {
        this.sendSyncEvent('services_refresh', {});
    }
    
    // Setup service sync listeners for main page
    setupMainPageSync() {
        this.onSyncEvent((syncData) => {
            switch (syncData.type) {
                case 'service_created':
                case 'service_updated':
                case 'service_deleted':
                case 'service_status_changed':
                case 'services_refresh':
                    // Refresh service catalog
                    if (window.serviceRenderer) {
                        window.serviceRenderer.refresh();
                        
                        // Show notification
                        if (window.showInfo) {
                            window.showInfo('Catálogo Atualizado', 'Os serviços foram atualizados pelo painel administrativo.');
                        }
                    }
                    break;
                    
                default:
                    EnvironmentConfig.log('debug', 'Unknown sync event type', syncData.type);
            }
        });
        
        EnvironmentConfig.log('info', 'Main page sync listeners setup');
    }
    
    // Setup service sync listeners for admin page
    setupAdminPageSync() {
        this.onSyncEvent((syncData) => {
            switch (syncData.type) {
                case 'service_created':
                case 'service_updated':
                case 'service_deleted':
                case 'service_status_changed':
                    // Refresh admin service list if function exists
                    if (typeof window.loadServices === 'function') {
                        window.loadServices();
                    }
                    
                    // Show notification
                    if (window.showInfo) {
                        window.showInfo('Sincronizado', 'Alterações detectadas em outra aba. Lista atualizada.');
                    }
                    break;
                    
                default:
                    EnvironmentConfig.log('debug', 'Unknown sync event type in admin', syncData.type);
            }
        });
        
        EnvironmentConfig.log('info', 'Admin page sync listeners setup');
    }
    
    // Check if current page is admin
    isAdminPage() {
        return window.location.pathname.includes('admin') || 
               document.title.includes('Admin') ||
               document.getElementById('adminPanel') !== null;
    }
    
    // Auto-setup based on page type
    autoSetup() {
        if (this.isAdminPage()) {
            this.setupAdminPageSync();
        } else {
            this.setupMainPageSync();
        }
    }
    
    // Destroy and cleanup
    destroy() {
        window.removeEventListener('storage', this.handleStorageEvent.bind(this));
        this.listeners = [];
        EnvironmentConfig.log('info', 'CrossTabSync destroyed');
    }
}

// Global instance
let crossTabSync = null;

// Initialize cross-tab sync
function initializeCrossTabSync() {
    if (!crossTabSync) {
        crossTabSync = new CrossTabSync();
        crossTabSync.autoSetup();
    }
    return crossTabSync;
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CrossTabSync = CrossTabSync;
    window.initializeCrossTabSync = initializeCrossTabSync;
    window.crossTabSync = crossTabSync;
}