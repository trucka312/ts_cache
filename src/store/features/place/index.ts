/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import { State } from "@/constants/api";
import { Place } from "@/model/Place";
import {
  createPlaceThunk,
  deletePlaceByIdThunk,
  getAllPlacesThunk,
  updatePlaceByIdThunk,
} from "./thunk";
import { createPlace } from "@/store/reducers/place";

interface IPlaceSlice {
  places?: Place[];
  status: State;
}

const initialState: IPlaceSlice = {
  status: State.IDLE,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlacesThunk.pending, (state) => {
        state.status = State.LOADING;
      })
      .addCase(getAllPlacesThunk.fulfilled, (state, action) => {
        state.places = action.payload;
        state.status = State.IDLE;
      })
      .addCase(getAllPlacesThunk.rejected, (state) => {
        state.status = State.IDLE;
      });

    builder.addCase(updatePlaceByIdThunk.fulfilled, (state, action) => {
      const newPlaces = state.places?.map((place) => {
        if (place.id === action.payload.id) {
          return action.payload;
        }
        return place;
      });
      state.places = newPlaces;
    });

    builder.addCase(deletePlaceByIdThunk.fulfilled, (state, action) => {
      const newPlaces = state.places?.filter(
        (place) => place.id !== action.payload
      );
      state.places = newPlaces;
    });

    builder.addCase(createPlaceThunk.fulfilled, (state, action) => {
      state.places?.push(action.payload);
    });
  },
});

export default placeSlice.reducer;
