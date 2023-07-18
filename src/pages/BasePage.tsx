import { getAllPlacesThunk } from "@/store/features/place/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import React from "react";
import { Spinner } from "@chakra-ui/react";
import { selectPlace } from "@/store/features/place/selector";
import { State } from "@/constants/api";
import { Outlet } from "react-router-dom";

const BasePage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectPlace);
  React.useEffect(() => {
    dispatch(getAllPlacesThunk()).catch((err) => {
      console.log(err.message);
    });
  }, []);
  return status === State.LOADING ? <Spinner /> : <Outlet />;
};

export default BasePage;
