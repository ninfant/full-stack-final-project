import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    return res.data.token;
  }
);
