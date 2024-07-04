import { Request, Response } from 'express';
import OrderModel from '@/models/order.model';
import ProductModel from '@/models/products.model';
import { sendInvoice } from '@/utils/mail/mail';

export const createOrder = async (req: Request, res: Response) => {
  const { orderItems } = req.body;
  const user = (req as any).user;

  try {
    let grandTotal = 0;

    for (const item of orderItems) {
      const product = await ProductModel.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.productId} not found.` });
      }
      if (item.quantity > product.qty) {
        return res.status(400).json({ message: `Insufficient stock for product ${item.name}.` });
      }
      grandTotal += item.price * item.quantity;
    }

    const order = new OrderModel({
      grandTotal,
      orderItems,
      createdBy: user.id,
      status: 'pending'
    });

    await order.save();

    for (const item of orderItems) {
      await ProductModel.findByIdAndUpdate(item.productId, { $inc: { qty: -item.quantity } });
    }

    await sendInvoice(user.email, order);

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error: String(error) });
    }
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
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error: String(error) });
    }
  }
};
