// ================================================
// COIN DETAIL PAGE JAVASCRIPT - FIXED VERSION
// ================================================

// Investment Calculator
let sharePrice = 87.00;
let platformFeePercent = 0.025;

// FIXED: Renamed to match HTML onchange calls
function updateInvestmentCalculation() {
    const shares = parseInt(document.getElementById('shareQuantity').value) || 0;
    const subtotal = shares * sharePrice;
    const platformFee = subtotal * platformFeePercent;
    const total = subtotal + platformFee;
    const ownershipPercent = (shares / 1000) * 100;
    
    // Update display elements
    const investmentAmount = document.getElementById('investmentAmount');
    const ownershipPercentage = document.getElementById('ownershipPercentage');
    
    if (investmentAmount) {
        investmentAmount.textContent = '$' + subtotal.toFixed(2);
    }
    
    if (ownershipPercentage) {
        ownershipPercentage.textContent = ownershipPercent.toFixed(2) + '%';
    }
}

// Kept for backward compatibility
function updateInvestment() {
    updateInvestmentCalculation();
}

function adjustShares(amount) {
    const input = document.getElementById('shareQuantity');
    if (!input) return;
    
    let currentValue = parseInt(input.value) || 0;
    let newValue = currentValue + amount;
    
    // Keep within bounds
    if (newValue < 1) newValue = 1;
    if (newValue > 287) newValue = 287;
    
    input.value = newValue;
    updateInvestmentCalculation();
}

// FIXED: Better integration with stripe-payment-fixed.js
function proceedToCheckout() {
    const shares = parseInt(document.getElementById('shareQuantity').value) || 0;
    
    if (shares < 1) {
        alert('Please select at least 1 share.');
        return;
    }
    
    // Get the coin ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const coinId = urlParams.get('id') || 'abbasid-dinar-773';
    
    // Get coin data
    const coinData = getCoinDataById(coinId);
    
    if (coinData && typeof openPaymentModal === 'function') {
        // FIXED: Pass shares as second parameter to pre-fill modal
        openPaymentModal(coinData, shares);
    } else {
        // Fallback for debugging
        console.error('Payment modal function not found or coin data missing');
        alert('Please ensure stripe-payment-fixed.js is loaded correctly.');
    }
}

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Set button active
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Scroll to tabs section on mobile
    if (window.innerWidth < 768) {
        const tabSection = document.querySelector('.details-tabs');
        if (tabSection) {
            tabSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// 3D Viewer Controls
function resetCoinCamera() {
    const modelViewer = document.getElementById('coinViewer');
    if (modelViewer) {
        modelViewer.cameraOrbit = '0deg 75deg 105%';
        modelViewer.fieldOfView = '45deg';
        
        // Visual feedback
        const button = event.currentTarget;
        if (button) {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);
        }
    }
}

function toggleCoinRotation() {
    const modelViewer = document.getElementById('coinViewer');
    if (modelViewer) {
        modelViewer.autoRotate = !modelViewer.autoRotate;
        
        // Visual feedback
        const button = event.currentTarget;
        if (button) {
            if (modelViewer.autoRotate) {
                button.classList.add('active');
                button.title = 'Stop Rotation';
            } else {
                button.classList.remove('active');
                button.title = 'Start Rotation';
            }
        }
    }
}

function toggleCoinFullscreen() {
    const container = document.querySelector('.coin-viewer-container');
    if (!container) return;
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// FIXED: Simpler function that works with coin-detail-fixed.html
function adjustQuantity(change) {
    const input = document.getElementById('shareQuantity');
    if (!input) return;
    
    const current = parseInt(input.value) || 1;
    const min = parseInt(input.getAttribute('min')) || 1;
    const max = parseInt(input.getAttribute('max')) || 287;
    
    const newValue = Math.max(min, Math.min(max, current + change));
    input.value = newValue;
    
    updateInvestmentCalculation();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize calculator
    updateInvestmentCalculation();
    
    // Set up quantity input listener
    const quantityInput = document.getElementById('shareQuantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', updateInvestmentCalculation);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key.toLowerCase()) {
            case 'r':
                resetCoinCamera();
                break;
            case ' ':
                e.preventDefault();
                toggleCoinRotation();
                break;
            case 'f':
                toggleCoinFullscreen();
                break;
            case '+':
            case '=':
                adjustShares(1);
                break;
            case '-':
                adjustShares(-1);
                break;
        }
    });
    
    console.log('✅ Coin Detail Page Initialized');
    console.log('📍 Keyboard shortcuts: R (reset), Space (rotate), F (fullscreen), +/- (adjust shares)');
});

// Helper function to get coin data
// Note: This is duplicated from stripe-payment.js for compatibility
// Consider consolidating into shared coin-data.js file
function getCoinDataById(coinId) {
    const coins = {
        'abbasid-dinar-773': {
            id: 'abbasid-dinar-773',
            title: 'Abbasid Gold Dinar',
            period: '157 AH / 773 CE',
            caliph: 'Caliph al-Manṣūr',
            sharePrice: 87.00,
            totalValue: 87000,
            availableShares: 287,
            totalShares: 1000
        },
        'abbasid-dinar-780': {
            id: 'abbasid-dinar-780',
            title: 'Abbasid Gold Dinar',
            period: '164 AH / 780 CE',
            caliph: 'Caliph al-Mahdi',
            sharePrice: 92.50,
            totalValue: 92500,
            availableShares: 412,
            totalShares: 1000
        },
        'abbasid-dinar-800': {
            id: 'abbasid-dinar-800',
            title: 'Abbasid Gold Dinar',
            period: '786–809 CE',
            caliph: 'Harun al-Rashid',
            sharePrice: 105.00,
            totalValue: 105000,
            availableShares: 523,
            totalShares: 1000
        },
        'abbasid-dinar-920': {
            id: 'abbasid-dinar-920',
            title: 'Abbasid Gold Dinar',
            period: 'AH 310 / 920 CE',
            caliph: 'Al-Muqtadir',
            sharePrice: 78.00,
            totalValue: 78000,
            availableShares: 523,
            totalShares: 1000
        }
    };
    
    return coins[coinId];
}
