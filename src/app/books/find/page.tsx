"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Divider, FormControl, FormHelperText, InputLabel, List, MenuItem, Pagination, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";

// interface IRatings {
//   average: number;
//   count: number;
//   rating_1: number;
//   rating_2: number;
//   rating_3: number;
//   rating_4: number;
//   rating_5: number;
// }

// interface IUrlIcon {
//   large: string;
//   small: string;
// }

// interface IBook {
//   isbn13: number;
//   authors: string;
//   publication: number;
//   original_title: string;
//   title: string;
//   ratings: IRatings;
//   icons: IUrlIcon;
// }

interface IBook {
  isbn13: number;
  authors: string;
  publication_year: number;
  original_title: string;
  title: string;
  rating_avg: number;
  rating_count: number;
  rating_1_star: number;
  rating_2_star: number;
  rating_3_star: number;
  rating_4_star: number;
  rating_5_star: number;
  image_url: string;
  image_small_url: string;
}

function BookListItem(
  {book, onGetDetails,}: {book: IBook; onGetDetails: ({book}: {book: IBook}) => void;}) {
  return (
    <ListItem onClick={() => onGetDetails({book})}>
        <ListItemAvatar>
            {/* <Avatar src= {book.icons.large}"https://images.gr-assets.com/books/1447303603m/2767052.jpg"  */}
            <Avatar src= {book.image_small_url}
            variant="square" 
            sx={{width: "98px", height: "146px", marginRight: "1em", border: "3px solid", borderColor: "secondary.main"}}/>
        </ListItemAvatar>
        <ListItemText
        primaryTypographyProps={{fontSize: '24px',}}
        secondaryTypographyProps={{fontSize: '20px'}}
        // primary={"Title: " + /*`${book.title}`*/"The Hunger Games"}
        // secondary={"By " + /*`${book.author}`*/"Suzanne Collins"}
        primary={"Title: " + `${book.title}`}
        secondary={"By " + `${book.authors}`}
        />
    </ListItem>      
  );
}
export default function Find() {

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [booksPerPage, setBooksPerPage] = React.useState(10);

  // const perPage = 10;

    //Use a look here to get all the data from all the books.
  React.useEffect(() => {
    fetch('http://localhost:4000/books/all2?page=${curentPage}&limit=${booksPerPage}', {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  }, []);

  //Loads the details page
  const handleDetails = (
    {book}: {book: IBook}) => {
    // fetch("http://localhost:4000/bookDetails/" + {/*Book title? */}, {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    // }).then(
    //   // (res) => res.ok && setMessages(messages.filter((msg) => msg.name != name))
    // );
  };

  //Handles the change of the page we are in.
  const handleCurrentPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // setCurrentPage(value);
    console.dir(value);
    fetch('http://localhost:4000/books/all2?page=${value}&limit=${booksPerPage}', {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  };

  //Handles the change of books per page.
  // const handleBooksPerPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setBooksPerPage(value);
  //   //Will the other ones then get called as well like the update of the books?
  // };

  const handleBooksPerPageChange = (event: SelectChangeEvent) => {
    // setBooksPerPage(parseInt(event.target.value, 10));

    // console.dir(event);

    fetch('http://localhost:4000/books/all2?page=${curentPage}&limit=${event.target.value}', {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  };

  return (
    <Container>
      <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
      >
        <Box sx={{ mt: 1 }}>
          <List>
            {books.map((book, index, books) => (
              <React.Fragment key={"book list item: " + index}>
                <BookListItem book={book} onGetDetails={handleDetails} />
                {index < books.length - 1 && (
                  <Divider variant="middle" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
          <Stack spacing={2}>
            <Box sx={{display: "flex", Direction: "row",}}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={String(booksPerPage)}
                  onChange={handleBooksPerPageChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Books per page' }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
               </Select>
              <FormHelperText>Books Per Page</FormHelperText>
              </FormControl>
              <FormControl sx={{mt:2.5,}}>
                <Pagination 
                  count={20} 
                  page={currentPage}
                  onChange={handleCurrentPageChange}
                  color="primary" />
              </FormControl>
            </Box>
          </Stack>
        </Box>
    </Container>
    
  );
}