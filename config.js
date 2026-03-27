// AI Digital Store Configuration
// DO NOT commit this file with real API keys
// Use environment variables in production

const CONFIG = {
    // Website Information
    siteName: "AI Digital Store",
    siteUrl: "https://di3379.github.io/ai-digital-store", // UPDATE AFTER DEPLOYMENT
    contactEmail: "support@aidigitalstore.com",
    
    // Solana Payment Configuration
    solana: {
        walletAddress: "7ZgWYsKXo5yoVPkHMYc2tZoZUpkQ41JrYy88t7nG8axv",
        network: "mainnet-beta",
        requiredConfirmations: 1,
        // Helius RPC endpoint - CONFIGURED
        rpcEndpoint: "https://mainnet.helius-rpc.com/?api-key=cd2396ad-5731-4921-9d4d-85f1820f8c56",
        webhookSecret: "YOUR_WEBHOOK_SECRET" // For payment verification
    },
    
    // Email Configuration (Resend)
    email: {
        provider: "resend",
        apiKey: "re_nU9Nx3JD_2xh5EPfbASZ2NWUANYipQRSo",
        fromEmail: "delivery@aidigitalstore.com",
        fromName: "AI Digital Store",
        replyTo: "support@aidigitalstore.com"
    },
    
    // Product Configuration
    products: {
        1: {
            id: 1,
            name: "AI E-Commerce Automation Guide",
            price: 49.99,
            priceInSOL: 0.25, // Approximate, will be calculated dynamically
            type: "ebook",
            deliveryMethod: "email",
            filePath: "/assets/products/ai-ecommerce-guide.pdf",
            description: "80-page PDF with 10 automation templates and case studies"
        },
        2: {
            id: 2,
            name: "Solana Payment Development Kit",
            price: 79.99,
            priceInSOL: 0.40,
            type: "code",
            deliveryMethod: "download",
            filePath: "/assets/products/solana-payment-kit.zip",
            description: "Complete payment integration code + deployment guide"
        },
        3: {
            id: 3,
            name: "Feishu Bitable E-Commerce Template",
            price: 29.99,
            priceInSOL: 0.15,
            type: "template",
            deliveryMethod: "access",
            filePath: "https://wcnrabvzk683.feishu.cn/base/R8YzbyjFxairVLstigPcbD7Dnfx",
            description: "Ready-to-use e-commerce management system template"
        }
    },
    
    // Feishu Bitable Integration
    feishu: {
        appToken: "R8YzbyjFxairVLstigPcbD7Dnfx",
        tables: {
            products: "tbltG7Z2NZLdHqDe",
            orders: "tblfSBNR6Nyitf6j",
            customers: "tblz0nIEyNBNBfHH",
            finance: "tblOXbQWcnuZJO9W",
            credentials: "tbliu1bsB2f1H6OV"
        },
        // API credentials will be added via environment variables
        apiKey: "YOUR_FEISHU_API_KEY"
    },
    
    // System Settings
    system: {
        autoDeliveryDelay: 180, // seconds after payment confirmation
        checkInterval: 30, // seconds between payment checks
        maxRetries: 3,
        refundPolicyHours: 48,
        supportHours: "9:00-18:00 UTC+8"
    },
    
    // URLs and Endpoints
    urls: {
        terms: "/terms.html",
        privacy: "/privacy.html",
        refund: "/refund.html",
        contact: "/contact.html",
        webhook: "/api/webhook/payment" // For payment notifications
    },
    
    // Feature Flags
    features: {
        enableAutoDelivery: true,
        enableEmailNotifications: true,
        enableFeishuSync: true,
        enableCryptoPayments: true,
        testMode: false // Set to true for testing without real payments
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}

// Helper function to update configuration
function updateConfig(newConfig) {
    Object.assign(CONFIG, newConfig);
    console.log("Configuration updated");
}

// Initialize configuration on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        console.log(`${CONFIG.siteName} configuration loaded`);
        
        // Update dynamic values
        const currentUrl = window.location.origin;
        if (currentUrl && CONFIG.siteUrl.includes('[username]')) {
            CONFIG.siteUrl = currentUrl;
        }
        
        // Calculate SOL prices based on current rate (simplified)
        // In production, fetch from API
        const solRate = 200; // Example: 1 SOL = $200
        for (const id in CONFIG.products) {
            CONFIG.products[id].priceInSOL = CONFIG.products[id].price / solRate;
        }
    });
}