import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.REACT_APP_BASE_URL }),
  reducerPath: "mainApi",
  tagTypes: ["Kpis"],
  endpoints: (build) => ({
    getKpis: build.query({
      query: () => `kpi/kpis/`,
      providesTags: ["Kpis"],
    }),
  }),
});

export const { useGetKpisQuery } = api;
