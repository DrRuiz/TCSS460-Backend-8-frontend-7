"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import { FormState, addRatingFormSchema } from "./definitions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


interface IBook {
  authors: string;
  id: number;
  image_small_url: string;
  image_url: string;
  isbn13: string;
  original_title: string;
  publication_year: number;
  rating_1_star: number;
  rating_2_star: number;
  rating_3_star: number;
  rating_4_star: number;
  rating_5_star: number;
  rating_avg: number;
  rating_count: number;
  title: string;
}

let displayedBook: IBook = {
  authors: "",
  id: 0,
  image_small_url: "",
  image_url: "",
  isbn13: "",
  original_title: "",
  publication_year: 0,
  rating_1_star: 0,
  rating_2_star: 0,
  rating_3_star: 0,
  rating_4_star: 0,
  rating_5_star: 0,
  rating_avg: 0,
  rating_count: 0,
  title: ""
};

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: "",
  alertSeverity: "",
};

function BookListItem({book}: {book: IBook}) {
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
  const [formState, setFormState] = React.useState<FormState>();
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const isbn13 = String(data.get("isbn13"));

    const validateFields = addRatingFormSchema.safeParse({
      isbn13: isbn13,
      star: Number(data.get("star")),
    });

    if (!validateFields.success) {
      const error: FormState = {
        errors: validateFields.error?.flatten().fieldErrors,
      };
      error?.errors?.isbn13;
      setFormState(error);

      console.log(error?.errors?.isbn13 && error.errors?.isbn13[0]);
      console.dir({ errors: validateFields.error?.flatten().fieldErrors });
      return { errors: validateFields.error?.flatten().fieldErrors };
    } else {
      setFormState({});
    }
    console.dir('isbn13:', isbn13);

    fetch(`http://localhost:4000/books/rating/${isbn13}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.S
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        star : validateFields.data.star}),
    })
      .then((res) =>
        res
          .json()
          .then((body) => ({ body: body, ok: res.ok, status: res.status }))
      )
      .then((res) => {
        console.dir(res);
        if (res.ok) {
          setAlert({
            showAlert: true,
            alertMessage: "Rating Updated!",
            alertSeverity: "success",
          });
        displayedBook = res.body.book
        } else {
          setAlert({
            showAlert: true,
            alertMessage: "Rating Not Updated!" + res.body.message,
            alertSeverity: "error",
          });
        }
        return;
      });
  };
  return (
    <Container>
      <Box
        sx={{
          alignItems: "center",
          position: 'relative',
          width: "100%",
        }} 
      >
        <Typography variant="h3" component="h1" sx={{ mb: 2, textAlign: "center"}}>
          Add a New Book
        </Typography>
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="id"
              label="Database ID Number: "
              name="id"
              autoFocus
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="isbn13"
              label="ISBN13 Number: "
              name="isbn13"
              autoFocus
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="isbn13"
              label="ISBN13 Number: "
              name="isbn13"
              autoFocus
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="isbn13"
              label="ISBN13 Number: "
              name="isbn13"
              autoFocus
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="isbn13"
              label="ISBN13 Number: "
              name="isbn13"
              autoFocus
              color="info"
        />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Rating
            </Button>
      </Box>
      <BookListItem book={displayedBook} />
    </Container>
  );
}