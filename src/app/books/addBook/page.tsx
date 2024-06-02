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

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

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
      <Typography sx={{fontSize: '24px'}}>
      {book.title}
      </Typography>
      {/* <Typography sx={{fontSize: '24px'}}>
      Harry Potter and the Sorcerer's Stone (Harry Potter #1)
      </Typography> */}
      <Typography sx={{fontSize: '12px', color: "text.secondary"}}>
      ISBN: {book.isbn13}
      <br />
      <br />
      </Typography>
      {/* <Typography sx={{fontSize: '12px', color: "text.secondary"}}>
      ISBN: 919241982418
      <br />
      <br />
      </Typography> */}
      <Typography sx={{fontSize: '18px'}}>
      By {book.authors} - Published {book.publication_year}
      <br />
      </Typography>
      {/* <Typography sx={{fontSize: '18px'}}>
      By J.K. Rowling - Published 2001
      <br />
      </Typography> */}
      <Typography sx={{fontSize: '14px'}}>
      Total Ratings: {book.rating_count} / Average Rating: {book.rating_avg}
      </Typography>
      {/* <Typography sx={{fontSize: '14px'}}>
      Total Ratings: 1213831 / Average Rating: 4.54
      </Typography> */}
      <Typography sx={{fontSize: '14px'}}>
        <Rating 
        name='book-rating'
        readOnly
        value={book.rating_avg}
        precision={0.5}
        />
      </Typography>
      {/* <Typography sx={{fontSize: '14px'}}>
        <Rating 
        name='book-rating'
        readOnly
        value={4.54}
        precision={0.5}
        />
      </Typography> */}
    </Container>
  );
}

export default function AddBook() {
  const [formState, setFormState] = React.useState<FormState>();
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const id = Number(data.get("id"));
    const isbn13 = String(data.get("isbn13"));
    const author = String(data.get("author"));
    const year = Number(data.get("publication_year"));
    const title = String(data.get("title"));

    console.log("id: (" + id + ") ibsn13: (" + isbn13 + ") author: (" + author + ") year: (" + year + ") title: (" + title + ")");

    const validateFields = addRatingFormSchema.safeParse({
      id: id,
      isbn13: isbn13,
      author: author,
      year: year,
      title: title,
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

    fetch(`http://localhost:4000/books/new/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.S
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        id : validateFields.data.id,
        isbn13 : validateFields.data.isbn13,
        authors : validateFields.data.author,
        publication_year : validateFields.data.year,
        title : validateFields.data.title
      }),
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
            alertMessage: "Book added!",
            alertSeverity: "success",
          });
        displayedBook = res.body.entry
        } else {
          setAlert({
            showAlert: true,
            alertMessage: "Book not added!" + res.body.message,
            alertSeverity: "error",
          });
        }
        return;
      });
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
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
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="author"
              label="Author: "
              name="author"
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="publication_year"
              label="Publication Year: "
              name="publication_year"
              color="info"
        />
        <TextField
              error={formState?.errors?.isbn13 != undefined}
              helperText={formState?.errors?.isbn13 ?? ""}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title: "
              name="title"
              color="info"
        />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Book
            </Button>
      </Box>
      <BookListItem book={displayedBook} />
    </Container>
  );
}