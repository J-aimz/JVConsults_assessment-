import { Box, Typography } from "@mui/material";
import React from "react";

export default function Hero(location) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid red",
        display: "flex",
        alignItems: "center",
        backgroundImage:
          "url(https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
          {
              location == 'hero' &&
                <Box pl={20} width={"40%"}>
                    <Typography variant="h2" component={"h1"}>
                    John wick:
                    </Typography>
                    <Typography variant="subtitle2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
                    veritatis voluptas quisquam dolores saepe, quidem odit facilis
                    temporibus eos quo!
                    </Typography>
                </Box>
       }   
    </Box>
  );
}
