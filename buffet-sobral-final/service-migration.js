// Service Migration Utility - Migrate hardcoded services to database
class ServiceMigrationUtility {
    constructor(dataService) {
        this.dataService = dataService;
        this.migrationKey = 'buffet_services_migrated';
        
        EnvironmentConfig.log('info', 'ServiceMigrationUtility initialized');
    }
    
    // Check if migration has already been completed
    isMigrationCompleted() {
        return localStorage.getItem(this.migrationKey) === 'true';
    }
    
    // Mark migration as completed
    markMigrationCompleted() {
        localStorage.setItem(this.migrationKey, 'true');
        EnvironmentConfig.log('info', 'Migration marked as completed');
    }
    
    // Main migration method
    async migrateHardcodedServices() {
        if (this.isMigrationCompleted()) {
            EnvironmentConfig.log('info', 'Migration already completed, skipping');
            return { success: true, message: 'Migration already completed', servicesProcessed: 0 };
        }
        
        try {
            EnvironmentConfig.log('info', 'Starting hardcoded services migration');
            
            // Get hardcoded services
            const hardcodedServices = this.getHardcodedServices();
            
            if (hardcodedServices.length === 0) {
                EnvironmentConfig.log('info', 'No hardcoded services found to migrate');
                this.markMigrationCompleted();
                return { success: true, message: 'No services to migrate', servicesProcessed: 0 };
            }
            
            let processedCount = 0;
            let createdCount = 0;
            let updatedCount = 0;
            let errorCount = 0;
            
            // Process each service
            for (const serviceData of hardcodedServices) {
                try {
                    const result = await this.ensureServiceExists(serviceData);
                    processedCount++;
                    
                    if (result.created) {
                        createdCount++;
                    } else if (result.updated) {
                        updatedCount++;
                    }
                    
                    EnvironmentConfig.log('debug', `Processed service: ${serviceData.name}`, result);
                    
                } catch (error) {
                    errorCount++;
                    EnvironmentConfig.log('error', `Failed to process service: ${serviceData.name}`, error);
                }
            }
            
            // Mark migration as completed if no errors
            if (errorCount === 0) {
                this.markMigrationCompleted();
            }
            
            const result = {
                success: errorCount === 0,
                message: `Migration completed: ${createdCount} created, ${updatedCount} updated, ${errorCount} errors`,
                servicesProcessed: processedCount,
                created: createdCount,
                updated: updatedCount,
                errors: errorCount
            };
            
            EnvironmentConfig.log('info', 'Migration completed', result);
            return result;
            
        } catch (error) {
            EnvironmentConfig.log('error', 'Migration failed', error);
            return {
                success: false,
                message: `Migration failed: ${error.message}`,
                servicesProcessed: 0,
                error: error.message
            };
        }
    }
    
    // Get hardcoded services data
    getHardcodedServices() {
        // Default hardcoded services from the original system
        return [
            {
                name: 'Buffet Completo',
                description: 'Salgados, doces, bebidas e serviço completo para sua festa',
                price_per_person: 45.00,
                icon: '🍽️',
                category: 'buffet',
                active: true,
                display_order: 1,
                min_quantity: 20,
                max_quantity: 500,
                unit_type: 'person',
                featured: true,
                popular: true
            },
            {
                name: 'Bolo Personalizado',
                description: 'Bolos temáticos e personalizados para sua festa especial',
                price_per_person: 8.50,
                icon: '🎂',
                category: 'doces',
                active: true,
                display_order: 2,
                min_quantity: 20,
                max_quantity: 500,
                unit_type: 'person',
                featured: true,
                popular: true
            },
            {
                name: 'Decoração Temática',
                description: 'Decoração completa e personalizada para todos os tipos de festa',
                price_per_person: 15.00,
                icon: '🎨',
                category: 'decoracao',
                active: true,
                display_order: 3,
                min_quantity: 20,
                max_quantity: 500,
                unit_type: 'person',
                featured: false,
                popular: true
            },
            {
                name: 'Coffee Break Corporativo',
                description: 'Café, salgados, doces e sucos para eventos empresariais',
                price_per_person: 25.00,
                icon: '☕',
                category: 'corporativo',
                active: true,
                display_order: 4,
                min_quantity: 10,
                max_quantity: 200,
                unit_type: 'person',
                featured: false,
                popular: false
            },
            {
                name: 'Coquetel de Confraternização',
                description: 'Finger foods, canapés e bebidas para eventos sociais',
                price_per_person: 35.00,
                icon: '🥂',
                category: 'coquetel',
                active: true,
                display_order: 5,
                min_quantity: 30,
                max_quantity: 300,
                unit_type: 'person',
                featured: false,
                popular: false
            },
            {
                name: 'Lanche Festivo',
                description: 'Sanduíches, salgados e bebidas para festas casuais',
                price_per_person: 18.00,
                icon: '🥪',
                category: 'lanche',
                active: true,
                display_order: 6,
                min_quantity: 20,
                max_quantity: 400,
                unit_type: 'person',
                featured: false,
                popular: false
            }
        ];
    }
    
    // Extract services from HTML (if any exist in DOM)
    extractServicesFromHTML() {
        const extractedServices = [];
        
        try {
            // Look for existing service cards in the DOM
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach((card, index) => {
                try {
                    const titleElement = card.querySelector('.service-title');
                    const priceElement = card.querySelector('.service-price');
                    const descriptionElement = card.querySelector('.service-description');
                    const iconElement = card.querySelector('.service-image-placeholder');
                    
                    if (titleElement && priceElement) {
                        const name = titleElement.textContent.trim();
                        const priceText = priceElement.textContent.trim();
                        const description = descriptionElement ? descriptionElement.textContent.trim() : '';
                        const icon = iconElement ? iconElement.textContent.trim() : '🍽️';
                        
                        // Extract price from text (e.g., "R$ 45,00 por pessoa")
                        const priceMatch = priceText.match(/R\$\s*([\d,]+\.?\d*)/);
                        const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;
                        
                        if (name && price > 0) {
                            extractedServices.push({
                                name,
                                description: description || `Serviço ${name}`,
                                price_per_person: price,
                                icon: icon.charAt(0) || '🍽️', // Get first character (emoji)
                                category: 'outros',
                                active: true,
                                display_order: index + 1,
                                min_quantity: 20,
                                max_quantity: 500,
                                unit_type: 'person',
                                featured: false,
                                popular: false
                            });
                        }
                    }
                } catch (error) {
                    EnvironmentConfig.log('warn', `Error extracting service from card ${index}`, error);
                }
            });
            
            EnvironmentConfig.log('info', `Extracted ${extractedServices.length} services from HTML`);
            
        } catch (error) {
            EnvironmentConfig.log('warn', 'Error extracting services from HTML', error);
        }
        
        return extractedServices;
    }
    
    // Ensure service exists in database
    async ensureServiceExists(serviceData) {
        try {
            // Check if service already exists by name
            const existingServices = await this.dataService.get('services', {
                name: serviceData.name
            });
            
            if (existingServices.length > 0) {
                const existingService = existingServices[0];
                
                // Check if update is needed
                const needsUpdate = this.serviceNeedsUpdate(existingService, serviceData);
                
                if (needsUpdate) {
                    // Update existing service
                    const updatedService = await this.dataService.update('services', existingService.id, {
                        ...serviceData,
                        updated_at: new Date().toISOString()
                    });
                    
                    EnvironmentConfig.log('info', `Updated existing service: ${serviceData.name}`);
                    return { created: false, updated: true, service: updatedService };
                } else {
                    EnvironmentConfig.log('info', `Service already exists and up to date: ${serviceData.name}`);
                    return { created: false, updated: false, service: existingService };
                }
            } else {
                // Create new service
                const newService = await this.dataService.create('services', {
                    ...serviceData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });
                
                EnvironmentConfig.log('info', `Created new service: ${serviceData.name}`);
                return { created: true, updated: false, service: newService };
            }
            
        } catch (error) {
            EnvironmentConfig.log('error', `Error ensuring service exists: ${serviceData.name}`, error);
            throw error;
        }
    }
    
    // Check if service needs update
    serviceNeedsUpdate(existingService, newServiceData) {
        const fieldsToCheck = [
            'description', 'price_per_person', 'icon', 'category', 
            'active', 'display_order', 'min_quantity', 'max_quantity', 
            'unit_type', 'featured', 'popular'
        ];
        
        for (const field of fieldsToCheck) {
            if (newServiceData[field] !== undefined && existingService[field] !== newServiceData[field]) {
                EnvironmentConfig.log('debug', `Service ${existingService.name} needs update: ${field} changed`);
                return true;
            }
        }
        
        return false;
    }
    
    // Reset migration (for testing purposes)
    resetMigration() {
        localStorage.removeItem(this.migrationKey);
        EnvironmentConfig.log('info', 'Migration reset - will run again on next attempt');
    }
    
    // Get migration status
    getMigrationStatus() {
        return {
            completed: this.isMigrationCompleted(),
            migrationKey: this.migrationKey,
            hardcodedServicesCount: this.getHardcodedServices().length
        };
    }
    
    // Force migration (ignore completion status)
    async forceMigration() {
        this.resetMigration();
        return await this.migrateHardcodedServices();
    }
    
    // Validate service data before migration
    validateServiceData(serviceData) {
        const errors = [];
        
        if (!serviceData.name || serviceData.name.trim() === '') {
            errors.push('Service name is required');
        }
        
        if (!serviceData.description || serviceData.description.trim() === '') {
            errors.push('Service description is required');
        }
        
        if (!serviceData.price_per_person || serviceData.price_per_person <= 0) {
            errors.push('Valid price per person is required');
        }
        
        if (!serviceData.category) {
            errors.push('Service category is required');
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }
    
    // Get services that would be migrated (dry run)
    async previewMigration() {
        const hardcodedServices = this.getHardcodedServices();
        const htmlServices = this.extractServicesFromHTML();
        const allServices = [...hardcodedServices, ...htmlServices];
        
        const preview = {
            totalServices: allServices.length,
            services: [],
            conflicts: []
        };
        
        for (const serviceData of allServices) {
            try {
                // Check if service exists
                const existingServices = await this.dataService.get('services', {
                    name: serviceData.name
                });
                
                const servicePreview = {
                    name: serviceData.name,
                    action: existingServices.length > 0 ? 'update' : 'create',
                    existing: existingServices.length > 0 ? existingServices[0] : null,
                    new: serviceData
                };
                
                if (existingServices.length > 0) {
                    servicePreview.needsUpdate = this.serviceNeedsUpdate(existingServices[0], serviceData);
                }
                
                preview.services.push(servicePreview);
                
            } catch (error) {
                preview.conflicts.push({
                    service: serviceData.name,
                    error: error.message
                });
            }
        }
        
        return preview;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ServiceMigrationUtility = ServiceMigrationUtility;
}