/* eslint-disable react-refresh/only-export-components */
import BasePage from "@/pages/BasePage";
import HomePage from "@/pages/HomePage";
import PlacePage from "@/pages/PlacePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/place/:placeId",
        element: <PlacePage />,
      },
    ],
  },
]);
