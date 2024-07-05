import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { IOrder } from '@/models/order.model';
import UserModel from '@/models/user.model';

const transporter = nodemailer.createTransport({
    service: 'Zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'aceptaufik08@zohomail.com',
        pass: '@1B2c3d4f5',
    },
    requireTLS: true,
});

export const sendInvoice = async (to: string, order: IOrder) => {
    if (!to) {
        console.error('Error sending invoice: No recipients defined');
        return;
    }

    try {
        const user = await UserModel.findById(order.createdBy);
        if (!user) {
            throw new Error('User not found');
        }

        const templatePath = path.resolve(__dirname, 'templates', 'invoice.ejs');
        const content = await ejs.renderFile(templatePath, {
            customerName: user.username, // Gunakan user.username di sini
            orderItems: order.orderItems,
            grandTotal: order.grandTotal,
            contactEmail: 'aceptaufik08@zohomail.com',
            companyName: 'PT. Alim Rugi',
            year: new Date().getFullYear(),
        });

        await transporter.sendMail({
            from: 'aceptaufik08@zohomail.com',
            to,
            subject: 'Invoice',
            html: content,
        });

        console.log('Invoice sent successfully');
    } catch (error) {
        console.error('Error sending invoice:', error);
    }
};

