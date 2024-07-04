import { Request, Response } from 'express';
import OrderModel from '@/models/order.models';

export const getOrderHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10 } = req.query;

        const orders = await OrderModel.find({ createdBy: userId })
            .skip((page - 1) * limit)
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
        res.status(500).json({ message: error.message });
    }
};
