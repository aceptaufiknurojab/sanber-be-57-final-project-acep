import { Request, Response } from 'express';
import OrderModel from '@/models/order.model';
import ProductsModel from '@/models/products.model';  
import { sendInvoice } from '@/utils/mail/mail';

export const createOrder = async (req: Request, res: Response) => {
    const { orderItems } = req.body;
    const user = (req as any).user;

    try {
        let grandTotal = 0;

        const updatedOrderItems = [];

        for (const item of orderItems) {
            const product = await ProductsModel.findOne({ name: item.name });
            if (!product) {
                return res.status(400).json({ message: `Product with name ${item.name} not found.` });
            }
            if (item.quantity > product.qty) {
                return res.status(400).json({ message: `Insufficient stock for product ${product.name}.` });
            }

            const updatedItem = {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
            };

            grandTotal += updatedItem.price * updatedItem.quantity;
            updatedOrderItems.push(updatedItem);
        }

        const order = new OrderModel({
            grandTotal,
            orderItems: updatedOrderItems,
            createdBy: user.id,
            status: 'pending',
        });

        await order.save();

        for (const item of updatedOrderItems) {
            await ProductsModel.findByIdAndUpdate(item.productId, { $inc: { qty: -item.quantity } });
        }

        if (user.email) {
            await sendInvoice(user.email, order);
        } else {
            console.error('User email is not defined');
        }

        res.status(201).json(order);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Server error', error: errorMessage });
    }
};

export const getOrderHistory = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { page = 1, limit = 10 } = req.query;

        const orders = await OrderModel.find({ createdBy: userId })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalOrders = await OrderModel.countDocuments({ createdBy: userId });

        res.json({
            total: totalOrders,
            page: Number(page),
            limit: Number(limit),
            orders,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};
