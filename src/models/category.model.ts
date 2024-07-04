import mongoose, { Schema, Document } from 'mongoose';

enum OrderStatus {
    Pending = 'pending',
    Completed = 'completed',
    Cancelled = 'cancelled'
}

interface IOrderItem {
    name: string;
    productId: mongoose.Types.ObjectId;
    price: number;
    quantity: number;
}

interface IOrder extends Document {
    grandTotal: number;
    orderItems: IOrderItem[];
    createdBy: mongoose.Types.ObjectId;
    status: OrderStatus;
}

const OrderItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, max: 5 },
});

const OrderSchema: Schema = new Schema({
    grandTotal: { type: Number, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Pending },
}, { timestamps: true });

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
