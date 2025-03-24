import { IUser } from "./res.types";

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
  totalReviews?: number;
  averageRating?: number;
  category: string;
  imageURL: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  status: "active" | "inactive";
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrderItem {
  productId: string | IProduct;
  quantity: number;
  price: number;
  _id: string;
}

export interface IOrder {
  shippingAddress: ShippingAddress;
  _id: string;
  userId: string | IUser;
  items: IOrderItem[];
  totalPrice: number;
  status: "pending" | "cancelled" | "shipped" | "delivered";
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  product: IProduct;
  quantity: number;
}

export interface IProfileResType {
  _id: string;
  name: string;
  status?: string;
  email: string;
  avatar?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IReview {
  _id?: string;
  userId?: IReviewUserId;
  productId: string;
  rating: number;
  review: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IReviewUserId {
  _id: string;
  name: string;
}
