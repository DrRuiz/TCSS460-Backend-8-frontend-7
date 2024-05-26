import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: "100%"
        }} 
      >
        <Typography variant="h2" component="h1" sx={{ mb: 2, textAlign: "center"}} color='info.main'>
          Welcome to Group 7's TCSS 460 Book Database Front-end!
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: "center"}} color='info.main'>
          Created By: Riley Bennett, Derek Ruiz-Garcia, Max Yim, Ryan Anderson
        </Typography>
        <Typography variant="h6" component="h2" sx={{mb: 2, textAlign: "center" }}>
          Start by selecting one of the icons above to view books, add a book, or add a rating to an existing book.
        </Typography>
      </Box>
    </Container>
  );
}