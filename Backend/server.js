const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Configure CORS to only allow your frontend origin
app.use(cors({
  origin: ['https://eiddoglobal.com'],
  methods: ['POST', 'GET'], // add GET for /test-email endpoint as well
  credentials: false
}));

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT), // e.g. 587
  secure: false, // STARTTLS requires false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // allow self-signed certs for now
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Required fields missing' });
  }

  // You can reuse the transporter created above, no need to recreate it here
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'info@eiddoglobal.com',
    replyTo: email,
    subject: `Contact Form: ${subject || 'No Subject'}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
      detail: error.message
    });
  }
});

app.get('/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'info@eiddoglobal.com',
      to: 'yourpersonalemail@example.com',  // change to your personal email to test
      subject: 'Test Email from Eiddo Global Server',
      text: 'This is a test email sent using Nodemailer with aaPanel SMTP.'
    });
    res.send('Test email sent successfully!');
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).send('Failed to send test email.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
