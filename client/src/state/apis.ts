import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "mainApi",
  tagTypes: ["Kpis","Products","Transactions"],
  endpoints: (build) => ({
    getKpis: build.query({
      query: () => `kpi/kpis/`,
      providesTags: ["Kpis"],
    }),
    getProducts: build.query({
      query: () => `product/products`,
      providesTags: ["Products"],
    }),
    getTransactions: build.query({
      query: () => `/transaction/transactions`,
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery,useGetTransactionsQuery } = api;
