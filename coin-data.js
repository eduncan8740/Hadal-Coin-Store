// ================================================
// SHARED COIN DATABASE
// ================================================
// This file contains the coin data used across all pages
// to eliminate duplication and ensure consistency

const COIN_DATABASE = {
    'abbasid-dinar-773': {
        id: 'abbasid-dinar-773',
        title: 'Abbasid Gold Dinar',
        period: '157 AH / 773 CE',
        caliph: 'Caliph al-Manṣūr',
        sharePrice: 87.00,
        totalValue: 87000,
        availableShares: 287,
        totalShares: 1000,
        mint: 'Madinat al-Salam (Baghdad)',
        weight: '~4.25g',
        material: 'Gold (23-24k)',
        diameter: '~20mm'
    },
    'abbasid-dinar-780': {
        id: 'abbasid-dinar-780',
        title: 'Abbasid Gold Dinar',
        period: '164 AH / 780 CE',
        caliph: 'Caliph al-Mahdi',
        sharePrice: 92.50,
        totalValue: 92500,
        availableShares: 412,
        totalShares: 1000,
        mint: 'Madinat al-Salam (Baghdad)',
        weight: '~4.25g',
        material: 'Gold (23-24k)',
        diameter: '~20mm'
    },
    'abbasid-dinar-800': {
        id: 'abbasid-dinar-800',
        title: 'Abbasid Gold Dinar',
        period: '786–809 CE',
        caliph: 'Harun al-Rashid',
        sharePrice: 105.00,
        totalValue: 105000,
        availableShares: 523,
        totalShares: 1000,
        mint: 'Madinat al-Salam (Baghdad)',
        weight: '~4.25g',
        material: 'Gold (23-24k)',
        diameter: '~20mm'
    },
    'abbasid-dinar-920': {
        id: 'abbasid-dinar-920',
        title: 'Abbasid Gold Dinar',
        period: 'AH 310 / 920 CE',
        caliph: 'Al-Muqtadir',
        sharePrice: 78.00,
        totalValue: 78000,
        availableShares: 523,
        totalShares: 1000,
        mint: 'Madinat al-Salam (Baghdad)',
        weight: '~4.25g',
        material: 'Gold (23-24k)',
        diameter: '~20mm'
    }
};

/**
 * Get coin data by ID
 * @param {string} coinId - The coin identifier
 * @returns {object|null} Coin data object or null if not found
 */
function getCoinDataById(coinId) {
    return COIN_DATABASE[coinId] || null;
}

/**
 * Get all coins
 * @returns {object} All coins in database
 */
function getAllCoins() {
    return COIN_DATABASE;
}

/**
 * Get available coins (with shares remaining)
 * @returns {array} Array of available coins
 */
function getAvailableCoins() {
    return Object.values(COIN_DATABASE).filter(coin => coin.availableShares > 0);
}

/**
 * Calculate total portfolio value
 * @returns {number} Total value of all coins
 */
function getTotalPortfolioValue() {
    return Object.values(COIN_DATABASE).reduce((sum, coin) => sum + coin.totalValue, 0);
}

/**
 * Calculate total available shares across all coins
 * @returns {number} Total available shares
 */
function getTotalAvailableShares() {
    return Object.values(COIN_DATABASE).reduce((sum, coin) => sum + coin.availableShares, 0);
}

// Export for module systems (Node.js, etc.)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COIN_DATABASE,
        getCoinDataById,
        getAllCoins,
        getAvailableCoins,
        getTotalPortfolioValue,
        getTotalAvailableShares
    };
}

console.log('✅ Coin database loaded - ' + Object.keys(COIN_DATABASE).length + ' coins available');
