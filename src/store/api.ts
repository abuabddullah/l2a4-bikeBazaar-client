import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dummyData from "../data/dummy.json";
import type { IOrder, IProduct, IProfileResType } from "../types";
import { IApiResType, IUser } from "../types/res.types";
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
    getUsers: builder.query<IUser[], void>({
      query: () => "/users/all-users",
      transformResponse: (response: IApiResType<IUser[]>) => {
        return response.data;
      },
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation<
      IApiResType<IUser>,
      { targetUserId: string; status: string }
    >({
      query: (statusData) => ({
        url: "/users/update-status",
        method: "PATCH",
        body: statusData,
      }),
      transformResponse: (response: IApiResType<IUser>) => {
        return response;
      },
      invalidatesTags: ["User"], // প্রোফাইল রিফ্রেশ করার জন্য
    }),

    // Products
    getProducts: builder.query<IProduct[], void>({
      queryFn: () => ({ data: dummyData.products }),
    }),
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      queryFn: (product) => ({
        data: {
          id: String(dummyData.products.length + 1),
          ...product,
        } as IProduct,
      }),
    }),
    updateProduct: builder.mutation<
      IProduct,
      Partial<IProduct> & { id: string }
    >({
      queryFn: (product) => ({
        data: product as IProduct,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      queryFn: () => ({ data: undefined }),
    }),

    // Orders
    getOrders: builder.query<IOrder[], void>({
      query: () => "/orders/all-orders",
      transformResponse: (response: IApiResType<IOrder[]>) => {
        return response.data;
      },
      providesTags: ["Order"],
    }),
    getMyOrders: builder.query<IOrder[], void>({
      query: () => "/orders/my-orders",
      transformResponse: (response: IApiResType<IOrder[]>) => {
        return response.data;
      },
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<IOrder, { id: string; status: string }>(
      {
        query: ({ id, status }) => ({
          url: `/orders/${id}/status`,
          method: "PATCH",
          body: { status },
        }),
        transformResponse: (response: IApiResType<IOrder>) => {
          return response.data;
        },
        invalidatesTags: ["Order"],
      }
    ),

    // Profile
    getProfile: builder.query<IProfileResType, void>({
      query: () => "/users/profile",
      transformResponse: (response: IApiResType<IProfileResType>) => {
        return response.data;
      },
    }),
    updateProfile: builder.mutation<IProfileResType, Partial<IProfileResType>>({
      queryFn: (profile) => ({
        data: { ...dummyData.profile, ...profile },
      }),
    }),
    changePassword: builder.mutation<
      { success: boolean; message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (credentials) => ({
        url: "/users/change-password",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { success: boolean; message: string }) => {
        return response;
      },
      invalidatesTags: ["Profile"], // প্রোফাইল রিফ্রেশ করার জন্য
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
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = api;
