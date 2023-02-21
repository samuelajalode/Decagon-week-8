import mongoose from 'mongoose';
export interface OrderAttributes {
    user:mongoose.Schema.Types.ObjectId;
    orderItems:[string];
    shippingAddress:string;
    paymentMethod:string;
    paymentResult:string;
    taxPrice:number;
    shippingPrice:number;
    totalPrice:number;
    price:number;
    isPaid:boolean;
    paidAt:Date;
    isDelivered:boolean;
    deliveredAt:Date;
}
export const OrderSchema = new mongoose.Schema<OrderAttributes>(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        orderItems:[
            {
                name:{type: String, required:true},
                qty: { type:Number, required:true},
                image: {type: String, required: true},
                price: { type: Number, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],
        shippingAddress:{
            address:{ type:String, required:true},
            city:{ type:String, required:true},
            postalCode:{type:String, required:true},
            country:{type:String, required:true},
        },
        paymentMethod:{
            type:String,
            required:true,
            default:"Paypal",
        },
        paymentResult:{
            id:{ type: String},
            status:{type: String},
            update_time:{type:String},
            email_address:{type:String}
        },
        taxPrice:{
            type:Number,
            required:true,
            default:0.0,
        },
        shippingPrice:{
            type:Number,
            required:true,
            default:0.0,
        },
        totalPrice:{
            type:Number,
            required:true,
            default:0.0,
        },
        price:{
            type:Number,
            required:true,
            default:0.0,
        },
        isPaid:{
            type:Boolean,
            required: true,
            default:false
        },
        paidAt:{
            type:Date,
        },
        })
        