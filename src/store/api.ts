import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, Product, Order, Profile } from '../types';
import dummyData from '../data/dummy.json';

// Using dummy data instead of actual API calls
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User', 'Product', 'Order', 'Profile'],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<User[], void>({
      queryFn: () => ({ data: dummyData.users }),
    }),
    updateUserStatus: builder.mutation<User, { id: string; status: string }>({
      queryFn: ({ id, status }) => {
        const user = dummyData.users.find(u => u.id === id);
        return { data: { ...user, status } as User };
      },
    }),

    // Products
    getProducts: builder.query<Product[], void>({
      queryFn: () => ({ data: dummyData.products }),
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      queryFn: (product) => ({
        data: {
          id: String(dummyData.products.length + 1),
          ...product,
        } as Product,
      }),
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
      queryFn: (product) => ({
        data: product as Product,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      queryFn: () => ({ data: undefined }),
    }),

    // Orders
    getOrders: builder.query<Order[], void>({
      queryFn: () => ({ data: dummyData.orders }),
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      queryFn: ({ id, status }) => {
        const order = dummyData.orders.find(o => o.id === id);
        return { data: { ...order, status } as Order };
      },
    }),

    // Profile
    getProfile: builder.query<Profile, void>({
      queryFn: () => ({ data: dummyData.profile }),
    }),
    updateProfile: builder.mutation<Profile, Partial<Profile>>({
      queryFn: (profile) => ({
        data: { ...dummyData.profile, ...profile },
      }),
    }),
    changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      queryFn: () => ({ data: undefined }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = api;