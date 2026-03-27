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
    
    // Product Configuration - Optimized for MAXIMUM CONVERSION
    products: {
        // Entry-Level: Low Barrier, High Volume
        1: {
            id: 1,
            name: "AI电商入门秘籍",
            originalPrice: 29.99,
            price: 4.99,
            priceInSOL: 0.025,
            type: "starter-pack",
            deliveryMethod: "instant-email",
            filePath: "/assets/products/ai-ecommerce-starter.pdf",
            description: "21页快速入门指南：3小时学会AI自动化电商",
            features: [
                "5个现成自动化脚本",
                "3个高转化文案模板", 
                "每日执行清单",
                "7天邮件指导"
            ],
            badge: "🔥 限时特价",
            conversionRate: 12.5,
            soldCount: 127
        },
        // Mid-Level: Value Stack
        2: {
            id: 2,
            name: "AI自动化大师班",
            originalPrice: 99,
            price: 14.99,
            priceInSOL: 0.075,
            type: "premium-course",
            deliveryMethod: "download+coaching",
            filePath: "/assets/products/ai-masterclass.zip",
            description: "完整6周训练营：从零到$10K/月自动化收入",
            features: [
                "完整视频课程（12小时）",
                "源码库访问权限",
                "私有Discord社区",
                "每周直播答疑",
                "个性化指导"
            ],
            badge: "⭐ 最高评分",
            conversionRate: 6.8,
            soldCount: 89
        },
        // High-Ticket: Premium Solution
        3: {
            id: 3,
            name: "全自动电商帝国构建器",
            originalPrice: 197,
            price: 24.99,
            priceInSOL: 0.125,
            type: "enterprise-suite",
            deliveryMethod: "full-access",
            filePath: "https://wcnrabvzk683.feishu.cn/base/R8YzbyjFxairVLstigPcbD7Dnfx",
            description: "端到端解决方案：AI+区块链+自动化工作流",
            features: [
                "全套源代码（商业授权）",
                "Solana支付集成",
                "飞书CRM系统",
                "每月更新支持",
                "优先技术支持",
                "白标授权"
            ],
            badge: "🚀 限时升级",
            conversionRate: 3.5,
            soldCount: 42
        },
        // Upsell: Complementary Product
        4: {
            id: 4,
            name: "社交媒体自动化套件",
            originalPrice: 49,
            price: 9.99,
            priceInSOL: 0.05,
            type: "upsell-toolkit",
            deliveryMethod: "instant-access",
            filePath: "/assets/products/social-automation.zip",
            description: "每天5分钟，自动获取100+精准流量",
            features: [
                "TikTok/Reels自动生成脚本",
                "30个高互动文案模板",
                "发布排期工具",
                "数据分析面板"
            ],
            badge: "🎯 热门推荐",
            conversionRate: 8.2,
            soldCount: 156
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