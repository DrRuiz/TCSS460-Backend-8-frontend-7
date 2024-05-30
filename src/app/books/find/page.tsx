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
  const noImage = "https://i.ibb.co/1J2FMZJ/NoImage.png";
  return (
    <ListItem onClick={() => onGetDetails({book})}>
        <ListItemAvatar>
            <Avatar src= {book.image_small_url}
            variant="square" 
            sx={{width: "98px", height: "146px", marginRight: "1em", border: "3px solid", borderColor: "secondary.main"}}/>
        </ListItemAvatar>
        <ListItemText
        primaryTypographyProps={{fontSize: '24px',}}
        secondaryTypographyProps={{fontSize: '20px'}}
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
  const [lastPage, setLastPage] = React.useState(10);


    //Use a look here to get all the data from all the books.
  React.useEffect(() => {
    fetch(`http://localhost:4000/books/all2?page=${currentPage}&limit=${booksPerPage}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        setLastPage(data.pagination.totalPages);
      });
  }, [currentPage, booksPerPage]);

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
    setCurrentPage(value);
  };

  //Handles the change of books per page.
  const handleBooksPerPageChange = (event: SelectChangeEvent) => {
    setBooksPerPage(parseInt(event.target.value));
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
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
               </Select>
              <FormHelperText>Books Per Page</FormHelperText>
              </FormControl>
              <FormControl sx={{mt:2.5,}}>
                <Pagination 
                  count={lastPage} 
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