// Service Catalog Renderer - Dynamic service catalog for main page
class ServiceCatalogRenderer {
    constructor(dataService, container) {
        this.dataService = dataService;
        this.container = container;
        this.currentServices = [];
        this.isLoading = false;
        this.currentFilters = {};
        this.currentGuestCount = 59; // Default guest count
        
        // Bind methods to maintain context
        this.handleServiceInteraction = this.handleServiceInteraction.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleAddService = this.handleAddService.bind(this);
        
        EnvironmentConfig.log('info', 'ServiceCatalogRenderer initialized');
    }
    
    // Main method to load and render services
    async loadAndRenderServices(filters = {}) {
        if (this.isLoading) {
            EnvironmentConfig.log('debug', 'Service loading already in progress');
            return;
        }
        
        this.isLoading = true;
        this.currentFilters = { ...filters };
        
        try {
            this.showLoadingState();
            
            let services = [];
            
            // Try to load from DataService first
            if (this.dataService) {
                try {
                    services = await this.dataService.get('services', {
                        active: true,
                        ...filters
                    }, {
                        orderBy: { column: 'name', ascending: true },
                        useCache: true
                    });
                    EnvironmentConfig.log('info', `Loaded ${services.length} services from DataService`);
                } catch (error) {
                    EnvironmentConfig.log('warn', 'DataService failed, trying localStorage fallback', error);
                    services = this.loadServicesFromLocalStorage(filters);
                }
            } else {
                // No DataService available, load from localStorage
                EnvironmentConfig.log('info', 'No DataService available, loading from localStorage');
                services = this.loadServicesFromLocalStorage(filters);
            }
            
            this.currentServices = services;
            EnvironmentConfig.log('info', `Total services loaded for catalog: ${services.length}`);
            
            // Render services
            this.updateServiceDisplay(services);
            
        } catch (error) {
            EnvironmentConfig.log('error', 'Failed to load services for catalog', error);
            this.showErrorState(error);
        } finally {
            this.isLoading = false;
        }
    }
    
    // Load services from localStorage as fallback
    loadServicesFromLocalStorage(filters = {}) {
        try {
            const allServices = JSON.parse(localStorage.getItem('buffet_services') || '[]');
            
            // Apply filters
            let filteredServices = allServices.filter(service => {
                // Only show active services by default
                if (service.active === false) return false;
                
                // Apply additional filters
                for (const [key, value] of Object.entries(filters)) {
                    if (value !== undefined && value !== null && service[key] !== value) {
                        return false;
                    }
                }
                
                return true;
            });
            
            // Sort by name
            filteredServices.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            
            EnvironmentConfig.log('info', `Loaded ${filteredServices.length} services from localStorage`);
            return filteredServices;
            
        } catch (error) {
            EnvironmentConfig.log('error', 'Error loading services from localStorage', error);
            return [];
        }
    }
    
    // Render individual service card
    renderServiceCard(service) {
        const pricePerPerson = parseFloat(service.price_per_person) || 0;
        const totalPrice = pricePerPerson * this.currentGuestCount;
        const serviceIcon = service.icon || '🍽️';
        const serviceCategory = service.category || 'outros';
        
        return `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-image-placeholder">
                    ${serviceIcon}
                    <div class="service-image-overlay">
                        ${service.description || 'Serviço disponível para sua festa'}
                    </div>
                </div>
                <div class="service-content">
                    <div class="service-title">${service.name}</div>
                    <div class="service-price">R$ ${pricePerPerson.toFixed(2)} por pessoa</div>
                    <div class="service-description" style="font-size: 0.9rem; color: #666; margin: 10px 0;">
                        ${service.description || ''}
                    </div>
                    
                    <!-- Quantity Slider -->
                    <div class="service-slider-container">
                        <div class="service-quantity">
                            Quantidade: <span data-quantity-display="${service.id}">${this.currentGuestCount}</span> pessoas
                        </div>
                        <input 
                            type="range" 
                            min="20" 
                            max="500" 
                            value="${this.currentGuestCount}" 
                            class="service-slider" 
                            data-service-slider="${service.id}"
                            oninput="window.serviceRenderer?.handleQuantityChange(${service.id}, this.value)"
                        >
                        <div class="slider-labels">
                            <span>20</span>
                            <span>500</span>
                        </div>
                    </div>
                    
                    <!-- Price Calculation -->
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; margin: 10px 0;">
                        <div style="font-size: 0.9rem; color: #666;">Total estimado:</div>
                        <div style="font-size: 1.1rem; font-weight: 600; color: #2e7d32;" data-total-price="${service.id}">
                            R$ ${totalPrice.toFixed(2)}
                        </div>
                    </div>
                    
                    <!-- Add Button -->
                    <button 
                        class="btn-add" 
                        onclick="window.serviceRenderer?.handleAddService(${service.id})"
                        style="width: 100%; margin-top: 10px;"
                    >
                        ➕ Adicionar ao Orçamento
                    </button>
                </div>
            </div>
        `;
    }
    
    // Handle service interactions
    handleServiceInteraction(serviceId, action, data = {}) {
        const service = this.currentServices.find(s => s.id === serviceId);
        if (!service) {
            EnvironmentConfig.log('warn', `Service ${serviceId} not found for interaction`);
            return;
        }
        
        switch (action) {
            case 'add':
                this.addServiceToCart(service, data.quantity || this.currentGuestCount);
                break;
            case 'quantity_change':
                this.updateServiceQuantity(serviceId, data.quantity);
                break;
            default:
                EnvironmentConfig.log('warn', `Unknown service interaction: ${action}`);
        }
    }
    
    // Handle quantity slider changes
    handleQuantityChange(serviceId, quantity) {
        const quantityNum = parseInt(quantity);
        
        // Update display
        const quantityDisplay = document.querySelector(`[data-quantity-display="${serviceId}"]`);
        if (quantityDisplay) {
            quantityDisplay.textContent = quantityNum;
        }
        
        // Update price calculation
        this.updatePriceDisplay(serviceId, quantityNum);
        
        // Update global guest count if this is the main slider
        if (window.updateGuestCount) {
            this.currentGuestCount = quantityNum;
        }
    }
    
    // Handle add service to cart
    handleAddService(serviceId) {
        const service = this.currentServices.find(s => s.id === serviceId);
        if (!service) {
            EnvironmentConfig.log('warn', `Service ${serviceId} not found`);
            return;
        }
        
        const quantity = this.currentGuestCount;
        this.addServiceToCart(service, quantity);
    }
    
    // Add service to cart (integrate with existing simulator)
    addServiceToCart(service, quantity) {
        try {
            // Check if global selectedServices exists (from existing simulator)
            if (typeof window.selectedServices !== 'undefined') {
                // Check if service already exists
                const existingIndex = window.selectedServices.findIndex(s => s.id === service.id);
                
                if (existingIndex >= 0) {
                    // Update existing service
                    window.selectedServices[existingIndex].quantity = quantity;
                    window.selectedServices[existingIndex].total = service.price_per_person * quantity;
                } else {
                    // Add new service
                    window.selectedServices.push({
                        id: service.id,
                        name: service.name,
                        price: service.price_per_person,
                        quantity: quantity,
                        total: service.price_per_person * quantity,
                        icon: service.icon || '🍽️'
                    });
                }
                
                // Update simulator display if function exists
                if (typeof window.updateServicesList === 'function') {
                    window.updateServicesList();
                }
                
                if (typeof window.calculateTotal === 'function') {
                    window.calculateTotal();
                }
                
                // Show success notification
                if (window.showSuccess) {
                    window.showSuccess('Serviço Adicionado', `${service.name} foi adicionado ao seu orçamento!`);
                }
                
                EnvironmentConfig.log('info', `Service ${service.name} added to cart`, { quantity, total: service.price_per_person * quantity });
            } else {
                EnvironmentConfig.log('warn', 'selectedServices not found, cannot add service to cart');
            }
        } catch (error) {
            EnvironmentConfig.log('error', 'Error adding service to cart', error);
            if (window.showError) {
                window.showError('Erro', 'Não foi possível adicionar o serviço ao orçamento.');
            }
        }
    }
    
    // Update price display for a service
    updatePriceDisplay(serviceId, quantity) {
        const service = this.currentServices.find(s => s.id === serviceId);
        if (!service) return;
        
        const totalPrice = service.price_per_person * quantity;
        const priceElement = document.querySelector(`[data-total-price="${serviceId}"]`);
        
        if (priceElement) {
            priceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
        }
    }
    
    // Update the service display
    updateServiceDisplay(services) {
        if (!this.container) {
            EnvironmentConfig.log('error', 'Container not found for service display');
            return;
        }
        
        // Clear loading/error states
        this.hideLoadingState();
        this.hideErrorState();
        
        if (services.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // Create services grid
        const servicesGrid = document.createElement('div');
        servicesGrid.className = 'services-grid';
        servicesGrid.innerHTML = services.map(service => this.renderServiceCard(service)).join('');
        
        // Clear container and add new content
        this.container.innerHTML = '';
        this.container.appendChild(servicesGrid);
        
        EnvironmentConfig.log('info', `Rendered ${services.length} services in catalog`);
    }
    
    // Show loading state
    showLoadingState() {
        if (!this.container) return;
        
        const loadingElement = document.getElementById('servicesLoading');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        } else {
            // Create loading element if it doesn't exist
            this.container.innerHTML = `
                <div id="servicesLoading" style="text-align: center; padding: 40px;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #4caf50; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="margin-top: 20px; color: #666;">Carregando serviços...</p>
                </div>
            `;
        }
    }
    
    // Hide loading state
    hideLoadingState() {
        const loadingElement = document.getElementById('servicesLoading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    
    // Show error state
    showErrorState(error) {
        if (!this.container) return;
        
        const errorMessage = error?.message || 'Erro desconhecido ao carregar serviços';
        
        this.container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #fff3e0; border-radius: 12px; border: 1px solid #ff9800;">
                <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                <h3 style="color: #f57c00; margin-bottom: 15px;">Erro ao Carregar Serviços</h3>
                <p style="color: #666; margin-bottom: 20px;">${errorMessage}</p>
                <button class="btn-add" onclick="window.serviceRenderer?.loadAndRenderServices()" style="background: #ff9800;">
                    🔄 Tentar Novamente
                </button>
            </div>
        `;
    }
    
    // Hide error state
    hideErrorState() {
        // Error state is replaced by new content, no need to explicitly hide
    }
    
    // Show empty state
    showEmptyState() {
        if (!this.container) return;
        
        const emptyElement = document.getElementById('servicesEmpty');
        if (emptyElement) {
            emptyElement.style.display = 'block';
        } else {
            this.container.innerHTML = `
                <div id="servicesEmpty" style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🍽️</div>
                    <h3>Nenhum serviço disponível</h3>
                    <p style="color: #666; margin: 10px 0;">Os serviços aparecerão aqui quando forem adicionados no painel administrativo.</p>
                    <button class="btn-add" onclick="window.open('admin.html', '_blank')">🔧 Ir para Admin</button>
                </div>
            `;
        }
    }
    
    // Refresh services (public method)
    async refresh() {
        EnvironmentConfig.log('info', 'Refreshing service catalog');
        await this.loadAndRenderServices(this.currentFilters);
    }
    
    // Update guest count for all services
    updateGuestCount(guestCount) {
        this.currentGuestCount = parseInt(guestCount);
        
        // Update all quantity displays
        document.querySelectorAll('[data-quantity-display]').forEach(element => {
            element.textContent = this.currentGuestCount;
        });
        
        // Update all sliders
        document.querySelectorAll('[data-service-slider]').forEach(slider => {
            slider.value = this.currentGuestCount;
        });
        
        // Update all price displays
        this.currentServices.forEach(service => {
            this.updatePriceDisplay(service.id, this.currentGuestCount);
        });
        
        EnvironmentConfig.log('debug', `Updated guest count to ${this.currentGuestCount} for all services`);
    }
    
    // Get current services
    getCurrentServices() {
        return [...this.currentServices];
    }
    
    // Check if renderer is loading
    isCurrentlyLoading() {
        return this.isLoading;
    }
    
    // Destroy renderer and clean up
    destroy() {
        this.currentServices = [];
        this.isLoading = false;
        this.currentFilters = {};
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        EnvironmentConfig.log('info', 'ServiceCatalogRenderer destroyed');
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ServiceCatalogRenderer = ServiceCatalogRenderer;
}