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
            name: "AI鐢靛晢鍏ラ棬绉樼睄",
            originalPrice: 29.99,
            price: 4.99,
            priceInSOL: 0.025,
            type: "starter-pack",
            deliveryMethod: "instant-email",
            filePath: "/assets/products/ai-ecommerce-starter.pdf",
            description: "21椤靛揩閫熷叆闂ㄦ寚鍗楋細3灏忔椂瀛︿細AI鑷姩鍖栫數鍟?,
            features: [
                "5涓幇鎴愯嚜鍔ㄥ寲鑴氭湰",
                "3涓珮杞寲鏂囨妯℃澘", 
                "姣忔棩鎵ц娓呭崟",
                "7澶╅偖浠舵寚瀵?
            ],
            badge: "馃敟 闄愭椂鐗逛环",
            conversionRate: 12.5,
            soldCount: 127
        },
        // Mid-Level: Value Stack
        2: {
            id: 2,
            name: "AI鑷姩鍖栧ぇ甯堢彮",
            originalPrice: 99,
            price: 14.99,
            priceInSOL: 0.075,
            type: "premium-course",
            deliveryMethod: "download+coaching",
            filePath: "/assets/products/ai-masterclass.zip",
            description: "瀹屾暣6鍛ㄨ缁冭惀锛氫粠闆跺埌$10K/鏈堣嚜鍔ㄥ寲鏀跺叆",
            features: [
                "瀹屾暣瑙嗛璇剧▼锛?2灏忔椂锛?,
                "婧愮爜搴撹闂潈闄?,
                "绉佹湁Discord绀惧尯",
                "姣忓懆鐩存挱绛旂枒",
                "涓€у寲鎸囧"
            ],
            badge: "猸?鏈€楂樿瘎鍒?,
            conversionRate: 6.8,
            soldCount: 89
        },
        // High-Ticket: Premium Solution
        3: {
            id: 3,
            name: "鍏ㄨ嚜鍔ㄧ數鍟嗗笣鍥芥瀯寤哄櫒",
            originalPrice: 197,
            price: 24.99,
            priceInSOL: 0.125,
            type: "enterprise-suite",
            deliveryMethod: "full-access",
            filePath: "https://wcnrabvzk683.feishu.cn/base/R8YzbyjFxairVLstigPcbD7Dnfx",
            description: "绔埌绔В鍐虫柟妗堬細AI+鍖哄潡閾?鑷姩鍖栧伐浣滄祦",
            features: [
                "鍏ㄥ婧愪唬鐮侊紙鍟嗕笟鎺堟潈锛?,
                "Solana鏀粯闆嗘垚",
                "椋炰功CRM绯荤粺",
                "姣忔湀鏇存柊鏀寔",
                "浼樺厛鎶€鏈敮鎸?,
                "鐧芥爣鎺堟潈"
            ],
            badge: "馃殌 闄愭椂鍗囩骇",
            conversionRate: 3.5,
            soldCount: 42
        },
        // Upsell: Complementary Product
        4: {
            id: 4,
            name: "绀句氦濯掍綋鑷姩鍖栧浠?,
            originalPrice: 49,
            price: 9.99,
            priceInSOL: 0.05,
            type: "upsell-toolkit",
            deliveryMethod: "instant-access",
            filePath: "/assets/products/social-automation.zip",
            description: "姣忓ぉ5鍒嗛挓锛岃嚜鍔ㄨ幏鍙?00+绮惧噯娴侀噺",
            features: [
                "TikTok/Reels鑷姩鐢熸垚鑴氭湰",
                "30涓珮浜掑姩鏂囨妯℃澘",
                "鍙戝竷鎺掓湡宸ュ叿",
                "鏁版嵁鍒嗘瀽闈㈡澘"
            ],
            badge: "馃幆 鐑棬鎺ㄨ崘",
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