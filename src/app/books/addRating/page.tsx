"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import { FormState, addRatingFormSchema } from "./definitions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
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
    <Container sx={{}}>
      <Box component="img" src={book.image_url}
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
      <Typography sx={{fontSize: '12px'}}>
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
      <Typography sx={{fontSize: '14px', color: "success.main"}}>
      Total Ratings: {book.rating_count}
      </Typography>
      <Typography sx={{fontSize: '14px', paddingLeft: '0px', display: 'fiex', color: "success.main"}}>
      Average Rating: {book.rating_avg.toFixed(2)}
      <Rating 
        name='book-rating'
        readOnly
        value={book.rating_avg}
        precision={.05}
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
  const [value, setValue] = React.useState<number | null>(5);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const [displayedBook, setDisplayedBook] = React.useState<IBook | null>(null);
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
        setDisplayedBook(res.body.book);
        } else {
          setAlert({
            showAlert: true,
            alertMessage: "Rating Not Updated!" + res.body.message,
            alertSeverity: "error",
          });
          setDisplayedBook(null);
        }

        return;
      });
  };

  return (
    
    <Container maxWidth="sm" sx={{border: "3px solid", borderColor: "text.secondary", float: "middle", color: "info.main", backgroundColor: "text.main"}} >
      {alert.showAlert && (
        <Alert
          severity={alert.alertSeverity as any}
          onClose={() => setAlert(EMPTY_ALERT)}
        >
          {alert.alertMessage}
        </Alert>
      )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, p: 10 ,color: "info.main", backgroundColor: "text.main"}}
          >
        <Typography variant="h3" component="h1" sx={{ mb: 2, textAlign: "center"}} color='success.primary' fontSize={32}>
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
              InputLabelProps={{sx: {p: -10, color:'info.main'}}}
              inputProps={{sx: {borderColor: 'info.main'}}}
            />
        <Typography sx={{fontSize: '14px'}} paddingLeft={1.5}>
            <Rating 
              name="star"
              id="star"
              defaultValue={4}
              value={value}
              onChange={(event, newVal) => {
                setValue(newVal);
              }}
            />
        </Typography>
          <Box sx={{fontSize: '14px'}} paddingLeft={2}>
          
          {value == 1 ? '1 Star - Worst Book Ever!' : ""}
          {value == 2 ? '2 Stars - I dislike This Book' : ""}
          {value == 3 ? '3 Stars - Not So good Not So Bad' : ""}
          {value == 4 ? '4 Stars - Great Book' : ""}
          {value == 5 ? '5 Stars - I Love This Book!' : ""}
          </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , color: 'info.main', backgroundColor: 'secondary.main'}}
            >
              Add Rating
            </Button>

            {displayedBook && <BookListItem book={displayedBook}/>}

      </Box>

    </Container>
  );
}