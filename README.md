# AI Digital Store - E-commerce Website

Premium digital products store powered by Solana payments and automated delivery.

## Features
- 馃洅 **3 Digital Products**: E-books, templates, and development kits
- 馃挸 **Solana Payments**: Direct crypto payments with automatic verification
- 馃摟 **Auto Delivery**: Instant email delivery upon payment confirmation
- 馃 **Fully Automated**: No manual intervention required
- 馃摫 **Responsive Design**: Works on all devices

## Technology Stack
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Hosting**: GitHub Pages (free)
- **Payment**: Solana blockchain + Helius RPC
- **Email**: Resend API
- **Backend**: Feishu Bitable for order management

## Product List
1. **AI E-Commerce Automation Guide** ($49.99)
   - 80-page PDF with 10 automation templates
   - Instant email delivery

2. **Solana Payment Development Kit** ($79.99)
   - Complete payment integration code
   - Download link delivery

3. **Feishu Bitable E-Commerce Template** ($29.99)
   - Ready-to-use management system
   - Online access

## Setup Instructions

### 1. GitHub Pages Deployment
1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to Settings 鈫?Pages
4. Select source: `Deploy from a branch`
5. Select branch: `main` and folder: `/ (root)`
6. Save - your site will be live at `https://[username].github.io/[repository]`

### 2. Configuration
Update the following in `config.js`:
- GitHub Pages URL
- Resend API key
- Helius RPC endpoint
- Solana wallet address

### 3. Testing
1. Make a test payment (small amount)
2. Verify automatic email delivery
3. Check Feishu Bitable for order records
4. Monitor system logs

## File Structure
```
/
鈹溾攢鈹€ index.html          # Main website
鈹溾攢鈹€ config.js           # Configuration file
鈹溾攢鈹€ payment-handler.js  # Payment processing logic
鈹溾攢鈹€ email-templates/    # Email templates
鈹溾攢鈹€ assets/            # Images, styles, scripts
鈹斺攢鈹€ README.md          # This file
```

## Security Notes
- Never commit API keys or secrets
- Use environment variables in production
- Enable 2FA on all service accounts
- Monitor payment address regularly

## Support
For issues or questions:
1. Check the Feishu Bitable order management system
2. Review system logs
3. Contact: support@aidigitalstore.com

## License
All digital products are sold with appropriate licenses.
Website code is proprietary.

---
**Last Updated**: 2026-03-27
**System Status**: In Development