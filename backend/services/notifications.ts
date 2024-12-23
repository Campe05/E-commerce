import sgMail from '@sendgrid/mail';
import { User } from '../models/User';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendSpecialOfferEmail(user: User, offerDetails: string) {
  const msg = {
    to: user.email,
    from: 'noreply@99percentcrossfit.com',
    subject: 'Special Offer from 99 Percent CrossFit',
    text: `Hello ${user.username},\n\n${offerDetails}\n\nVisit our website to take advantage of this offer!`,
    html: `<p>Hello ${user.username},</p><p>${offerDetails}</p><p>Visit our website to take advantage of this offer!</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Special offer email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending special offer email:', error);
    throw error;
  }
}

