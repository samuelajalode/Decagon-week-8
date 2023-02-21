import mongoose from 'mongoose';
export const reviewSchema = new mongoose.Schema(
  {
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
  },
  {
    timestamps: true,
  }
)
export interface ProductAttribute{
    name:string;
    image:string;
    description:string;
    reviews:[string];
    rating:number;
    numReviews:number;
    price:number;
    countInStock:number;
}
//export the instance to use on the productSchema
const productSchema = new mongoose.Schema<ProductAttribute>(
  {
    name:{
      type: String,
      required: true,
    },
    image:{
      type:String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    reviews:[reviewSchema],
    rating:{
      type: Number,
      default: 0,
    },
    numReviews:{
      type: Number,
      default: 0,
    },
    price:{
      type: Number,
      required: true,
      default: 0,
    },
    countInStock:{
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;