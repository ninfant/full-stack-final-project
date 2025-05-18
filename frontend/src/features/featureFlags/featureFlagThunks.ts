import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

interface CreateFlagPayload {
  name: string;
  customer: number[];
  region: number[];
  enabled: boolean;
}

export const fetchFlagsThunk = createAsyncThunk(
  "featureFlags/fetch", // featureFlags/fetch is just a redux action type prefix usado internamente para genererar las acciones pending, fulfilled etc
  async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get("/dashboard/flags-overview", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const createFlagsThunk = createAsyncThunk(
  "featureFlags/create",
  async (flagData: CreateFlagPayload, { dispatch }) => {
    const token = localStorage.getItem("jwt");

    const res = await axios.post("/feature-flags", flagData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const newFlag = res.data; // agrega el flag individualmente
    dispatch(fetchFlagsThunk()); // Luego refresca toda la lista, es opcional pero se mantiene en sync por si hay más cambios en el backend

    return newFlag; // por si quiero usarlo localmente
  }
);

export const toggleFlagThunk = createAsyncThunk(
  "featureFlags/toggle",
  async ({ id, enabled }: { id: number; enabled: boolean }) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(
      `/feature-flags/${id}/toggle`,
      { enabled },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("Sent toggle:", id, enabled);
    return res.data;
  }
);

export const deleteFlagThunk = createAsyncThunk(
  "featureFlags/delete",
  async (id: number) => {
    const token = localStorage.getItem("jwt");
    await axios.delete(`/feature-flags/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id; // to remove from local state
  }
);
