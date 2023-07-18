/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPlace,
  deletePlaceById,
  getAllPlaces,
  getPlaceById,
  updatePlaceById,
} from "@/store/reducers/place";
import { Place } from "@/model/Place";

const getAllPlacesThunk = createAsyncThunk("place/getAllPlaces", async () => {
  try {
    const res = await getAllPlaces();
    return res;
  } catch (err) {
    throw err;
  }
});

const getPlaceByIdThunk = createAsyncThunk(
  "place/getPlaceById",
  async (id: string) => {
    try {
      const res = await getPlaceById(id);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

const createPlaceThunk = createAsyncThunk(
  "place/createPlace",
  async (data: Place) => {
    try {
      const res = await createPlace(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

const updatePlaceByIdThunk = createAsyncThunk(
  "place/updatePlaceById",
  async (payload: { id: string; data: Place }) => {
    const { data, id } = payload;
    try {
      const res = await updatePlaceById(id, data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

const deletePlaceByIdThunk = createAsyncThunk(
  "place/deletePlaceById",
  async (id: string) => {
    try {
      const res = await deletePlaceById(id);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export {
  getAllPlacesThunk,
  getPlaceByIdThunk,
  createPlaceThunk,
  updatePlaceByIdThunk,
  deletePlaceByIdThunk,
};
