"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Divider, List, Pagination, Stack } from "@mui/material";

interface IRatings {
  average: number;
  count: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
}

interface IUrlIcon {
  large: string;
  small: string;
}

interface IBook {
  isbn13: number;
  authors: string;
  publication: number;
  original_title: string;
  title: string;
  ratings: IRatings;
  icons: IUrlIcon;
}

function BookListItem(
  {book, onGetDetails,}: {book: IBook; onGetDetails: ({book}: {book: IBook}) => void;}) {
  return (
    <ListItem onClick={() => onGetDetails({book})}>
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

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  //Loads the details page
  const handleDetails = (
    {book}: {book: IBook}) => {
    // fetch("http://localhost:4000/bookDetails/" + {/*Book title? */}, {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    // }).then(
    //   // (res) => res.ok && setMessages(messages.filter((msg) => msg.name != name))
    // );
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    //Will the other ones then get called as well like the update of the books?
  };

  const perPage = 10;

    //Use a look here to get all the data from all the books.
  React.useEffect(() => {
    fetch('http://localhost:4000/books/all2?page=${page}&limit=${perPage}', {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  }, []);

  return (
    <Container>
      {/* <Box
        sx={{
          alignItems: "center",
          position: 'relative',
          width: "100%",
        }} 
      >
        <Typography variant="h2" component="h1" sx={{ mb: 2, textAlign: "center"}} color='info.main'>
          Find Books
        </Typography>
      </Box> */}
      <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* This is hwere the search bar will go */}

          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EmailIcon />
          </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Read Messages
          </Typography> */}

          {/* Someething similar to select the fetch type author,  */}
          {/* <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              exclusive
              value={priority}
              onChange={handlePriorityClick}
            >
              <ToggleButton value={1}>
                <PriorityAvatar priority={1} />
              </ToggleButton>
              <ToggleButton value={2}>
                <PriorityAvatar priority={2} />
              </ToggleButton>
              <ToggleButton value={3}>
                <PriorityAvatar priority={3} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack> */}
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
        </Box>
      <Stack spacing={2}>
        {/* Change this to fit using the change in page size and maximum values */}
        <Pagination 
          count={20} 
          page={currentPage}
          onChange={handlePageChange}
          color="primary" />
      </Stack>
    </Container>
    
  );
}