"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import { FormState, addRatingFormSchema } from "./definitions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

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

function BookListItem({book}: {book: IBook}) {
  const [value, setValue] = React.useState<number | null>(5);
  const noImage = "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png";
  return (
    <Card sx={{position: "absolute", left: "1em", width: "50em"}}>
      <Box component="img" src={book.image_url ?? noImage}
      sx={{border: "3px solid", borderColor: "secondary.main", float: "left", marginRight: "1em"}} 
      />
      {/* <Typography sx={{fontSize: '24px'}}>
      {book.title}
      </Typography> */}
      <Typography sx={{fontSize: '24px'}}>
      {book.title}
      </Typography>
      {/* <Typography sx={{fontSize: '12px', color: "text.secondary"}}>
      ISBN: {book.isbn13}
      <br />
      <br />
      </Typography> */}
      <Typography sx={{fontSize: '12px', color: "text.secondary"}}>
      ISBN: {book.isbn13}
      <br />
      <br />
      </Typography>
      {/* <Typography sx={{fontSize: '18px'}}>
      By {book.authors} - Published {book.publication}
      <br />
      </Typography> */}
      <Typography sx={{fontSize: '18px'}}>
      By {book.authors} - {book.publication_year}
      <br />
      </Typography>
      {/* <Typography sx={{fontSize: '14px'}}>
      Total Ratings: {book.ratings.count} / Average Rating: {book.ratings.average}
      </Typography> */}
      <Typography sx={{fontSize: '14px'}}>
      Total Ratings: {book.rating_count} / Average Rating: {book.rating_avg}
      </Typography>
      <Typography sx={{fontSize: '14px'}}>
      <Rating 
        name='book-rating'
        value={value}
        onChange={(event, newVal) => {
          setValue(newVal);
        }}
        sx={{bordercolor: "warning.main"}}
    />
      </Typography>
    </Card>
  );
}

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
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

export default function addRating() {
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
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
        <Typography variant="h3" component="h1" sx={{ mb: 2, textAlign: "center"}}>
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
              color="info"
        />
            <TextField
              error={formState?.errors?.star != undefined}
              helperText={formState?.errors?.star ?? ""}
              margin="normal"
              required
              fullWidth
              id="star"
              label="Rating (1-5) : "
              name="star"
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