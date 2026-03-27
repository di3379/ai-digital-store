/**
 * Payment Handler for AI Digital Store
 * Handles Solana payment verification and order processing
 */

class PaymentHandler {
    constructor(config) {
        this.config = config;
        this.isProcessing = false;
        this.pendingPayments = new Map();
        this.init();
    }

    init() {
        console.log("Payment Handler initialized");
        
        // Load existing pending payments from localStorage
        this.loadPendingPayments();
        
        // Start payment verification loop
        if (this.config.features.enableCryptoPayments && !this.config.features.testMode) {
            this.startVerificationLoop();
        }
        
        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for payment confirmation messages
        window.addEventListener('message', (event) => {
            if (event.data.type === 'PAYMENT_SENT') {
                this.handlePaymentSent(event.data);
            }
        });

        // Listen for page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.checkPendingPayments();
            }
        });
    }

    /**
     * Handle customer payment submission
     */
    handlePaymentSent(paymentData) {
        const { productId, email, transactionHash, amount } = paymentData;
        
        console.log(`Payment submitted: ${transactionHash} for product ${productId}`);
        
        // Validate input
        if (!this.validatePaymentData(paymentData)) {
            this.showError("Invalid payment data. Please check your information.");
            return;
        }
        
        // Create pending payment record
        const paymentId = this.generatePaymentId();
        const pendingPayment = {
            id: paymentId,
            productId,
            email,
            transactionHash,
            amount,
            submittedAt: Date.now(),
            status: 'pending',
            checks: 0,
            maxChecks: 20 // Check for 10 minutes (30s intervals)
        };
        
        this.pendingPayments.set(paymentId, pendingPayment);
        this.savePendingPayments();
        
        // Show confirmation message
        this.showPaymentConfirmation(pendingPayment);
        
        // Start checking this payment
        this.checkPaymentStatus(paymentId);
    }

    /**
     * Validate payment data
     */
    validatePaymentData(data) {
        const { productId, email, transactionHash } = data;
        
        // Check product exists
        if (!this.config.products[productId]) {
            console.error(`Invalid product ID: ${productId}`);
            return false;
        }
        
        // Validate email
        if (!email || !this.isValidEmail(email)) {
            console.error(`Invalid email: ${email}`);
            return false;
        }
        
        // Validate transaction hash (basic check)
        if (!transactionHash || transactionHash.length < 32) {
            console.error(`Invalid transaction hash: ${transactionHash}`);
            return false;
        }
        
        return true;
    }

    /**
     * Check payment status for a specific payment
     */
    async checkPaymentStatus(paymentId) {
        const payment = this.pendingPayments.get(paymentId);
        
        if (!payment || payment.status !== 'pending') {
            return;
        }
        
        // Check if we've exceeded max checks
        if (payment.checks >= payment.maxChecks) {
            payment.status = 'timeout';
            this.pendingPayments.set(paymentId, payment);
            this.savePendingPayments();
            this.showError(`Payment timeout for transaction: ${payment.transactionHash}`);
            return;
        }
        
        payment.checks++;
        this.pendingPayments.set(paymentId, payment);
        
        try {
            // In production, this would call your backend API
            // For now, we'll simulate the check
            const isConfirmed = await this.verifyTransaction(payment.transactionHash);
            
            if (isConfirmed) {
                payment.status = 'confirmed';
                payment.confirmedAt = Date.now();
                this.pendingPayments.set(paymentId, payment);
                this.savePendingPayments();
                
                // Process the order
                this.processOrder(payment);
            } else {
                // Schedule next check
                setTimeout(() => {
                    this.checkPaymentStatus(paymentId);
                }, this.config.system.checkInterval * 1000);
            }
        } catch (error) {
            console.error(`Error checking payment ${paymentId}:`, error);
            // Retry after delay
            setTimeout(() => {
                this.checkPaymentStatus(paymentId);
            }, this.config.system.checkInterval * 1000);
        }
    }

    /**
     * Verify transaction on Solana blockchain
     * In production, this would use Helius RPC
     */
    async verifyTransaction(transactionHash) {
        if (this.config.features.testMode) {
            // For testing, simulate confirmation after 30 seconds
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 30000);
            });
        }
        
        // Production implementation would go here
        // Example using Helius RPC:
        /*
        const response = await fetch(this.config.solana.rpcEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTransaction',
                params: [transactionHash, { encoding: 'json' }]
            })
        });
        
        const data = await response.json();
        return data.result !== null;
        */
        
        // For now, return false to continue checking
        return false;
    }

    /**
     * Process confirmed order
     */
    async processOrder(payment) {
        console.log(`Processing order for payment: ${payment.id}`);
        
        try {
            // 1. Create order record in Feishu Bitable
            const orderId = await this.createFeishuOrder(payment);
            
            // 2. Send product via email
            await this.deliverProduct(payment, orderId);
            
            // 3. Update payment status
            payment.status = 'completed';
            payment.orderId = orderId;
            payment.deliveredAt = Date.now();
            this.pendingPayments.set(payment.id, payment);
            this.savePendingPayments();
            
            // 4. Show success message
            this.showOrderComplete(payment, orderId);
            
            // 5. Remove from pending after delay
            setTimeout(() => {
                this.pendingPayments.delete(payment.id);
                this.savePendingPayments();
            }, 60000); // Keep for 1 minute after completion
            
        } catch (error) {
            console.error(`Error processing order for payment ${payment.id}:`, error);
            payment.status = 'error';
            payment.error = error.message;
            this.pendingPayments.set(payment.id, payment);
            this.savePendingPayments();
            
            this.showError(`Order processing failed: ${error.message}`);
        }
    }

    /**
     * Create order record in Feishu Bitable
     */
    async createFeishuOrder(payment) {
        const product = this.config.products[payment.productId];
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // In production, this would call Feishu API
        // For now, log and return simulated order ID
        console.log(`Creating Feishu order: ${orderId}`, {
            product: product.name,
            email: payment.email,
            amount: payment.amount,
            transaction: payment.transactionHash
        });
        
        return orderId;
    }

    /**
     * Deliver product to customer
     */
    async deliverProduct(payment, orderId) {
        const product = this.config.products[payment.productId];
        
        // In production, this would call Resend API
        console.log(`Delivering product: ${product.name} to ${payment.email}`);
        
        // Simulate delivery delay
        await new Promise(resolve => {
            setTimeout(resolve, this.config.system.autoDeliveryDelay * 1000);
        });
        
        return true;
    }

    /**
     * Start background verification loop
     */
    startVerificationLoop() {
        setInterval(() => {
            this.checkPendingPayments();
        }, this.config.system.checkInterval * 1000);
    }

    /**
     * Check all pending payments
     */
    checkPendingPayments() {
        for (const [paymentId, payment] of this.pendingPayments) {
            if (payment.status === 'pending') {
                this.checkPaymentStatus(paymentId);
            }
        }
    }

    /**
     * UI Helper Methods
     */
    showPaymentConfirmation(payment) {
        const product = this.config.products[payment.productId];
        
        const message = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h4 class="font-bold text-green-800 mb-2">
                    <i class="fas fa-check-circle mr-2"></i>Payment Submitted
                </h4>
                <p class="text-green-700">
                    We're verifying your payment for <strong>${product.name}</strong>.
                    Transaction: <code class="text-sm">${payment.transactionHash.substring(0, 16)}...</code>
                </p>
                <p class="text-green-600 text-sm mt-2">
                    <i class="fas fa-clock mr-1"></i>This usually takes 1-3 minutes.
                    The product will be sent to <strong>${payment.email}</strong>.
                </p>
            </div>
        `;
        
        this.showMessage(message, 'payment-status');
    }

    showOrderComplete(payment, orderId) {
        const message = `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 class="font-bold text-blue-800 mb-2">
                    <i class="fas fa-gift mr-2"></i>Order Complete!
                </h4>
                <p class="text-blue-700">
                    Your order <strong>${orderId}</strong> has been processed successfully.
                    The product has been sent to your email.
                </p>
                <p class="text-blue-600 text-sm mt-2">
                    <i class="fas fa-envelope mr-1"></i>Check your inbox (and spam folder) for delivery.
                    If you don't receive it within 5 minutes, contact support.
                </p>
            </div>
        `;
        
        this.showMessage(message, 'order-status');
        
        // Send message to parent window if in iframe
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'ORDER_COMPLETE',
                orderId,
                paymentId: payment.id
            }, '*');
        }
    }

    showError(errorMessage) {
        const message = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h4 class="font-bold text-red-800 mb-2">
                    <i class="fas fa-exclamation-triangle mr-2"></i>Error
                </h4>
                <p class="text-red-700">${errorMessage}</p>
            </div>
        `;
        
        this.showMessage(message, 'error-status');
    }

    showMessage(html, elementId = 'status-messages') {
        let container = document.getElementById(elementId);
        
        if (!container) {
            container = document.createElement('div');
            container.id = elementId;
            document.body.appendChild(container);
        }
        
        container.innerHTML = html;
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (container && container.innerHTML === html) {
                container.innerHTML = '';
            }
        }, 30000);
    }

    /**
     * Utility Methods
     */
    generatePaymentId() {
        return `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    loadPendingPayments() {
        try {
            const saved = localStorage.getItem('pendingPayments');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.pendingPayments = new Map(Object.entries(parsed));
                console.log(`Loaded ${this.pendingPayments.size} pending payments`);
            }
        } catch (error) {
            console.error('Error loading pending payments:', error);
        }
    }

    savePendingPayments() {
        try {
            const obj = Object.fromEntries(this.pendingPayments);
            localStorage.setItem('pendingPayments', JSON.stringify(obj));
        } catch (error) {
            console.error('Error saving pending payments:', error);
        }
    }
}

// Initialize Payment Handler when config is available
if (typeof window !== 'undefined') {
    window.PaymentHandler = PaymentHandler;
    
    window.addEventListener('DOMContentLoaded', function() {
        if (window.CONFIG) {
            window.paymentHandler = new PaymentHandler(window.CONFIG);
        }
    });
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentHandler;
}