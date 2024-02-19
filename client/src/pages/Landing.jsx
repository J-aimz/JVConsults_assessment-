import React, { useState, useContext } from "react";
import {
  // Autocomplete,
  Box,
  // Button,
  // TextField,
  // Typography,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { HomeBody } from "../components";
import MovieDetails from "./MovieDetails";
// import url from "../utils/baseUrl";
// import { MovieContext } from "../utils/MovieContext";

export default function Landing() {

  return (
    <Box>
      
      <Box
        margin={"auto"}
        width={{ xs: "90%", sm: "80%", md: "70%" }}
        mt={{ xs: 2, sm: 4 }}
      >

        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<HomeBody /> }  />
        </Routes>
      </Box>
    </Box>
  );
}
