import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });
    return res.data.token;
  }
);
