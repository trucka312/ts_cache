export const API = {
  BASE: "http://localhost:8080/api",
  ENDPOINTS: {
    PLACE: {
      ALL: "/place",
      ONE: "/place/:id",
    },
  },
};

export enum State {
  LOADING = "LOADING",
  IDLE = "IDLE",
}
