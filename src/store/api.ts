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
  tagTypes: ["Customer", "Product", "Order", "Profile"],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<IUser[], void>({
      query: () => "/users/all-users",
      transformResponse: (response: IApiResType<IUser[]>) => {
        return response.data;
      },
      providesTags: ["Customer"],
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
      invalidatesTags: ["Customer"], // প্রোফাইল রিফ্রেশ করার জন্য
    }),

    // Products
    getProducts: builder.query<IProduct[], void>({
      query: () => "/products",
      transformResponse: (response: IApiResType<IProduct[]>) => {
        return response.data;
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, (data as any)[key]);
        });

        return {
          url: "/products",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      IProduct,
      Partial<IProduct | any> & { id: string | undefined }
    >({
      query: ({ id, ...product }) => {
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
          formData.append(key, (product as any)[key]);
        });
        console.log({ formData });
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: product,
        };
      },
      transformResponse: (response: IApiResType<IProduct>) => {
        return response.data;
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IApiResType<IProduct>) => {
        return response.data;
      },
      providesTags: ["Product"],
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
  useGetProductQuery,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = api;
