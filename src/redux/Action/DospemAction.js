import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_URL_API_KAPRODI;

export const getDospem = createAsyncThunk(
  "kaprodi/dospem",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/dospem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getDospemById = createAsyncThunk(
  "kaprodi/dospemId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/dospem/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const updateDospem = createAsyncThunk(
  "kaprodi/updateDospem",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/dospem/${data.id}`,
        {
          dospemId: data.dospemId,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getListDosen = createAsyncThunk(
  "kaprodi/listDosen",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/list-dospem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
