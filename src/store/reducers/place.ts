import apiInstance from "@/api";
import { API } from "@/constants/api";
import { Place } from "@/model/Place";

/* eslint-disable no-useless-catch */
const getAllPlaces = async () => {
  try {
    const res = await apiInstance.get(API.ENDPOINTS.PLACE.ALL);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getPlaceById = async (id: string) => {
  try {
    const res = await apiInstance.get(
      API.ENDPOINTS.PLACE.ONE.replace(":id", id)
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

const createPlace = async (data: Place) => {
  try {
    const res = await apiInstance.post(API.ENDPOINTS.PLACE.ALL, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const updatePlaceById = async (id: string, data: Place) => {
  try {
    const res = await apiInstance.put(
      API.ENDPOINTS.PLACE.ONE.replace(":id", id),
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

const deletePlaceById = async (id: string) => {
  try {
    const res = await apiInstance.delete(
      API.ENDPOINTS.PLACE.ONE.replace(":id", id)
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
};
