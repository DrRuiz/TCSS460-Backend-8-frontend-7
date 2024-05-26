"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import { FormState, addRatingFormSchema } from "./definitions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function BookListItem({book}: {book: /*IBook*/object}) {
  const [value, setValue] = React.useState<number | null>(5);
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
      <Typography sx={{fontSize: '14px'}}>
      <Rating 
        name='book-rating'
        value={value}
        onChange={(event, newVal) => {
          setValue(newVal);
        }}
    />
      </Typography>
      <Typography sx={{fontSize: '14px'}}>
        <Rating 
        name='book-rating'
        />
      </Typography>
    </Container>
  );
}

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

export default function addRating() {
  const [formState, setFormState] = React.useState<FormState>();
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const validateFields = addRatingFormSchema.safeParse({
      isbn13: data.get("isbn13"),
      rating: data.get("rating"),
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
    console.dir(validateFields.data);
    fetch("http://localhost:4000/books/update_by_ratings", {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateFields.data),
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
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
        <Typography variant="h3" component="h1" sx={{ mb: 2, textAlign: "center"}} color='info.main'>
          Add Rating to a Book
        </Typography>

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
            />
            <TextField
              error={formState?.errors?.rating != undefined}
              helperText={formState?.errors?.rating ?? ""}
              margin="normal"
              required
              fullWidth
              id="rating"
              label="Rating (1-5) : "
              name="rating"
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
    </Container>
  );
}