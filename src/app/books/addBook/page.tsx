import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';

function BookListItem({book}: {book: /*IBook*/object}) {
  return (
    <Container sx={{position: "absolute", left: "0%"}}>
      <Box component="img" src="https://images.gr-assets.com/books/1474154022m/3.jpg" 
      sx={{border: "3px solid", borderColor: "secondary.main", float: "left", marginRight: "1em"}} 
      />
      {/* <Typography sx={{fontSize: '24px'}}>
      {book.title}
      </Typography> */}
      <Typography sx={{fontSize: '24px'}}>
      Harry Potter and the Sorcerer's Stone (Harry Potter #1)
      </Typography>
      {/* <Typography sx={{fontSize: '12px', color: "text.secondary"}}>
      ISBN: {book.isbn13}
      <br />
      <br />
      </Typography> */}
      <Typography sx={{fontSize: '12px', color: "text.secondary"}}>
      ISBN: 919241982418
      <br />
      <br />
      </Typography>
      {/* <Typography sx={{fontSize: '18px'}}>
      By {book.authors} - Published {book.publication}
      <br />
      </Typography> */}
      <Typography sx={{fontSize: '18px'}}>
      By J.K. Rowling - Published 2001
      <br />
      </Typography>
      {/* <Typography sx={{fontSize: '14px'}}>
      Total Ratings: {book.ratings.count} / Average Rating: {book.ratings.average}
      </Typography> */}
      <Typography sx={{fontSize: '14px'}}>
      Total Ratings: 1213831 / Average Rating: 4.54
      </Typography>
      {/* <Typography sx={{fontSize: '14px'}}>
        <Rating 
        name='book-rating'
        readOnly
        value={book.ratings.average}
        precision={0.5}
        />
      </Typography> */}
      <Typography sx={{fontSize: '14px'}}>
        <Rating 
        name='book-rating'
        readOnly
        value={4.54}
        precision={0.5}
        />
      </Typography>
    </Container>
  );
}

export default function AddBook() {
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
          Add a New Book
        </Typography>
      </Box>
    </Container>
  );
}