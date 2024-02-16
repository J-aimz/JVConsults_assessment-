import { Box } from "@mui/material";
import React from "react";
import { Hero } from "../components";

export default function MoviePreview() {
  return (
    <Box mt={6} width={"70%"} m={"auto"}>
      <Box
        height={"60vh"}
        borderRadius={4}
        flex={4}
        sx={{ border: "1px solid red" }}
      >
        <Hero />
      </Box>

      <Box>hello</Box>
    </Box>
  );
}
