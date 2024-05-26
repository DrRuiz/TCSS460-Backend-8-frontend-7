"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function BookListItem({book}: {book: /*IBook*/object}) {
  return (
    <ListItem>
        <ListItemAvatar>
            <Avatar src=/*{book.icons.large}*/"https://images.gr-assets.com/books/1447303603m/2767052.jpg" 
            variant="square" 
            sx={{width: "98px", height: "146px", marginRight: "1em", border: "3px solid", borderColor: "secondary.main"}}/>
        </ListItemAvatar>
        <ListItemText
        primaryTypographyProps={{fontSize: '24px',}}
        secondaryTypographyProps={{fontSize: '20px'}}
        primary={"Title: " + /*`${book.title}`*/"The Hunger Games"}
        secondary={"By " + /*`${book.author}`*/"Suzanne Collins"}
        />
    </ListItem>
        
      );
}
export default function Find() {
  return (
    <Container>
      <Box
        sx={{
          alignItems: "center",
          position: 'relative',
          width: "100%",
        }} 
      >
        <Typography variant="h2" component="h1" sx={{ mb: 2, textAlign: "center"}} color='info.main'>
          Find Books
        </Typography>
      </Box>
    </Container>
    
  );
}