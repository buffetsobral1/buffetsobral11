// Simple Catalog Loader - Direct localStorage integration
function loadServicesInCatalog() {
    console.log('🔄 Loading services in catalog...');
    
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) {
        console.error('❌ Services container not found');
        return;
    }
    
    // Show loading
    servicesContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #4caf50; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #666;">Carregando serviços...</p>
        </div>
    `;
    
    try {
        // Get services from localStorage
        const services = JSON.parse(localStorage.getItem('buffet_services') || '[]');
        console.log('📦 Found services in localStorage:', services.length, services);
        
        // Filter only active services
        const activeServices = services.filter(service => service.active !== false);
        console.log('✅ Active services:', activeServices.length);
        
        if (activeServices.length === 0) {
            // Show empty state
            servicesContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🍽️</div>
                    <h3>Nenhum serviço disponível</h3>
                    <p style="color: #666; margin: 10px 0;">Os serviços aparecerão aqui quando forem adicionados no painel administrativo.</p>
                    <button class="btn-add" onclick="window.open('admin.html', '_blank')">🔧 Ir para Admin</button>
                </div>
            `;
            return;
        }
        
        // Create services grid
        const servicesGrid = document.createElement('div');
        servicesGrid.className = 'services-grid';
        
        // Generate service cards
        servicesGrid.innerHTML = activeServices.map(service => createServiceCard(service)).join('');
        
        // Clear container and add services
        servicesContainer.innerHTML = '';
        servicesContainer.appendChild(servicesGrid);
        
        console.log('✅ Services loaded successfully in catalog');
        
    } catch (error) {
        console.error('❌ Error loading services:', error);
        
        // Show error state
        servicesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #fff3e0; border-radius: 12px; border: 1px solid #ff9800;">
                <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                <h3 style="color: #f57c00;">Erro ao Carregar Serviços</h3>
                <p style="color: #666; margin-bottom: 20px;">Não foi possível carregar os serviços. Tente recarregar a página.</p>
                <button class="btn-add" onclick="location.reload()" style="background: #ff9800;">
                    🔄 Recarregar Página
                </button>
            </div>
        `;
    }
}

function createServiceCard(service) {
    const currentGuestCount = parseInt(document.getElementById('guestCount')?.textContent || '59');
    const pricePerPerson = parseFloat(service.price_per_person) || 0;
    const totalPrice = pricePerPerson * currentGuestCount;
    const serviceIcon = service.icon || '🍽️';
    
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
                        Quantidade: <span data-quantity-display="${service.id}">${currentGuestCount}</span> pessoas
                    </div>
                    <input 
                        type="range" 
                        min="20" 
                        max="500" 
                        value="${currentGuestCount}" 
                        class="service-slider" 
                        data-service-slider="${service.id}"
                        oninput="updateServiceQuantity(${service.id}, this.value)"
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
                    onclick="addServiceToCart(${service.id})"
                    style="width: 100%; margin-top: 10px;"
                >
                    ➕ Adicionar ao Orçamento
                </button>
            </div>
        </div>
    `;
}

function updateServiceQuantity(serviceId, quantity) {
    const quantityNum = parseInt(quantity);
    
    // Update display
    const quantityDisplay = document.querySelector(`[data-quantity-display="${serviceId}"]`);
    if (quantityDisplay) {
        quantityDisplay.textContent = quantityNum;
    }
    
    // Update price calculation
    const services = JSON.parse(localStorage.getItem('buffet_services') || '[]');
    const service = services.find(s => s.id == serviceId);
    
    if (service) {
        const totalPrice = service.price_per_person * quantityNum;
        const priceElement = document.querySelector(`[data-total-price="${serviceId}"]`);
        
        if (priceElement) {
            priceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
        }
    }
}

function addServiceToCart(serviceId) {
    try {
        const services = JSON.parse(localStorage.getItem('buffet_services') || '[]');
        const service = services.find(s => s.id == serviceId);
        
        if (!service) {
            console.error('Service not found:', serviceId);
            return;
        }
        
        const quantityElement = document.querySelector(`[data-quantity-display="${serviceId}"]`);
        const quantity = parseInt(quantityElement?.textContent || '59');
        
        // Check if global selectedServices exists (from existing simulator)
        if (typeof window.selectedServices !== 'undefined') {
            // Check if service already exists
            const existingIndex = window.selectedServices.findIndex(s => s.id == serviceId);
            
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
            
            // Show success message
            alert(`${service.name} foi adicionado ao seu orçamento!`);
            
            console.log('✅ Service added to cart:', service.name);
        } else {
            console.error('selectedServices not found');
            alert('Erro ao adicionar serviço ao orçamento.');
        }
        
    } catch (error) {
        console.error('Error adding service to cart:', error);
        alert('Erro ao adicionar serviço ao orçamento.');
    }
}

function refreshServices() {
    console.log('🔄 Refreshing services...');
    loadServicesInCatalog();
}

function debugServices() {
    console.log('=== DEBUG SERVICES ===');
    
    // Check localStorage services
    const localServices = JSON.parse(localStorage.getItem('buffet_services') || '[]');
    console.log('1. LocalStorage services:', localServices.length, localServices);
    
    // Check if container exists
    const container = document.getElementById('servicesContainer');
    console.log('2. Services container:', !!container);
    
    // Check active services
    const activeServices = localServices.filter(s => s.active !== false);
    console.log('3. Active services:', activeServices.length, activeServices);
    
    // Check global variables
    console.log('4. selectedServices:', typeof window.selectedServices, window.selectedServices?.length);
    
    // Force reload
    console.log('5. Forcing service reload...');
    loadServicesInCatalog();
    
    alert(`Debug info:
- Total services: ${localServices.length}
- Active services: ${activeServices.length}
- Container found: ${!!container}
- Check console for details`);
}

// Listen for storage changes (cross-tab sync)
window.addEventListener('storage', function(event) {
    if (event.key === 'buffet_services') {
        console.log('🔄 Services updated in another tab, refreshing...');
        setTimeout(() => {
            loadServicesInCatalog();
        }, 500);
    }
});

// Export functions
window.loadServicesInCatalog = loadServicesInCatalog;
window.refreshServices = refreshServices;
window.debugServices = debugServices;
window.addServiceToCart = addServiceToCart;
window.updateServiceQuantity = updateServiceQuantity;