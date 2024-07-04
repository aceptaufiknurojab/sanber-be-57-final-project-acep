import { Schema, model, models, Document } from 'mongoose';

interface IOrder extends Document {
  grandTotal: number;
  orderItems: {
    name: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
  createdBy: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const orderSchema = new Schema({
  grandTotal: { type: Number, required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const OrderModel = models.Order || model<IOrder>('Order', orderSchema);

export default OrderModel;
export { IOrder };
