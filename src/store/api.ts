import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dummyData from "../data/dummy.json";
import type { IProfileResType, Order, Product, User } from "../types";
import { IApiResType } from "../types/res.types";
import { RootState } from "./store";

// Using dummy data instead of actual API calls for design only
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Order", "Profile"],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<User[], void>({
      queryFn: () => ({ data: dummyData.users }),
    }),
    updateUserStatus: builder.mutation<User, { id: string; status: string }>({
      queryFn: ({ id, status }) => {
        const user = dummyData.users.find((u) => u.id === id);
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
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>(
      {
        queryFn: (product) => ({
          data: product as Product,
        }),
      }
    ),
    deleteProduct: builder.mutation<void, string>({
      queryFn: () => ({ data: undefined }),
    }),

    // Orders
    getOrders: builder.query<Order[], void>({
      queryFn: () => ({ data: dummyData.orders }),
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      queryFn: ({ id, status }) => {
        const order = dummyData.orders.find((o) => o.id === id);
        return { data: { ...order, status } as Order };
      },
    }),

    // Profile
    getProfile: builder.query<IProfileResType, void>({
      query: () => "/users/profile",
      transformResponse: (response: IApiResType<IProfileResType>) => {
        console.log({ response });
        return response.data;
      },
    }),
    updateProfile: builder.mutation<IProfileResType, Partial<IProfileResType>>({
      queryFn: (profile) => ({
        data: { ...dummyData.profile, ...profile },
      }),
    }),
    changePassword: builder.mutation<
      void,
      { currentPassword: string; newPassword: string }
    >({
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
