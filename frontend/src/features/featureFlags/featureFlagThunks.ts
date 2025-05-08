import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

export const fetchFlagsThunk = createAsyncThunk(
  "featureFlags/fetch",
  async (_, { getState }) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get("/feature-flags", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);
