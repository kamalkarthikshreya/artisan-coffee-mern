const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Explicit Simulation Check (Only if specifically requested)
    if (process.env.SIMULATE_EMAIL === 'true') {
        console.log('--- 📧 SIMULATED EMAIL ---');
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Content Preview: ${options.html.substring(0, 150).replace(/<[^>]*>?/gm, '')}...`);
        console.log('--------------------------');
        return;
    }

    // 2) Create a transporter
    let transporter;

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        console.log(`📡 SMTP initialized for user: ${process.env.GMAIL_USER}`);
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } else {
        console.warn('⚠️ SMTP Missing Credentials - GMAIL_USER or GMAIL_APP_PASSWORD not found in env');
        console.log('📧 [DEV] Email simulated (Missing Credentials):', options.subject);
        return;
    }

    // 3) Define the email options
    const mailOptions = {
        from: `"Artisan Coffee" <${process.env.GMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    };

    // 4) Actually send the email (Fire & Forget handle)
    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${options.to}`);
    } catch (err) {
        console.error('❌ Email send failed (NON-BLOCKING):', err.message);
    }
};

const generateOrderEmail = (order) => {
    const itemsHtml = order.items.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
            <div>
                <strong style="color: #3D2418;">${item.name}</strong>
                <div style="font-size: 12px; color: #777;">Quantity: ${item.quantity}</div>
            </div>
            <div style="font-weight: bold; color: #D4A574;">${item.price}</div>
        </div>
    `).join('');

    return `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf8f6; padding: 40px; border-radius: 16px; border: 1px solid #eaddd7;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #6f4536; font-family: 'Georgia', serif; font-size: 32px; margin: 0;">Artisan Coffee</h1>
                <p style="color: #a77f73; letter-spacing: 2px; text-transform: uppercase; font-size: 10px; margin-top: 5px;">Est. 2024</p>
            </div>

            <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h2 style="color: #3D2418; margin-top: 0;">Order Confirmed!</h2>
                <p style="color: #555; line-height: 1.6;">Hi ${order.customer.name},</p>
                <p style="color: #555; line-height: 1.6;">Thank you for your order. We're getting your coffee ready for shipment.</p>
                
                <div style="background-color: #1A0F0A; color: #F5E6D3; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; font-size: 12px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Order ID</p>
                    <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; font-family: monospace;">${order.orderId}</p>
                </div>

                <h3 style="color: #6f4536; border-bottom: 2px solid #eaddd7; padding-bottom: 10px; margin-top: 30px;">Order Summary</h3>
                ${itemsHtml}

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 2px solid #3d2418;">
                    <span style="font-size: 16px; font-weight: bold; color: #3D2418;">Total</span>
                    <span style="font-size: 24px; font-weight: bold; color: #6f4536;">$${order.totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #a77f73; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} Artisan Coffee. All rights reserved.</p>
                <p>123 Coffee Lane, Brew City, BC 90210</p>
            </div>
        </div>
    `;
};

module.exports = { sendEmail, generateOrderEmail };
