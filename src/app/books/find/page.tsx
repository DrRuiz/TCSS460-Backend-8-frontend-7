"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
// import { Divider, FormControl, FormHelperText, InputLabel, List, MenuItem, Pagination, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, FormHelperText, IconButton, InputBase, InputLabel, List, MenuItem, Pagination, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";

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
  const noImage = "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png";
  return (
    <ListItem onClick={() => onGetDetails({book})}>
        <Card sx={{position: "relative", width: "50em"}}>
        <ListItemAvatar>
            <Box component="img" src= {book.image_url ?? noImage}
            sx={{float: "left", marginRight: "1em", border: "3px solid", borderColor: "secondary.main"}}/>
        </ListItemAvatar>
        <ListItemText
        primaryTypographyProps={{fontSize: '24px',}}
        secondaryTypographyProps={{fontSize: '20px'}}
        primary={"Title: " + `${book.title}`}
        secondary={"By " + `${book.authors}`}
        />
        </Card>
    </ListItem>      
  );
}
export default function Find() {

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [booksPerPage, setBooksPerPage] = React.useState(10);
  const [lastPage, setLastPage] = React.useState(10);
  const [requestType, setRequestType] = React.useState("");
  const [searchLabel, setSearchLabel] = React.useState("Select a category to search for books");
  const [searchInput, setSearchInput] = React.useState("");
  const [search, setSearch] = React.useState(false);


  //Use a look here to get all the data from all the books.
  React.useEffect(() => {
    if(requestType === ""){
      fetch(`http://localhost:4000/books/all2?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBooks(data.books);
          setLastPage(data.pagination.totalPages);
        });
    }
  }, [requestType, currentPage, booksPerPage]);

  //Gets the book by title.
  React.useEffect(() => {
    if(requestType === "relative title" && search === true){
      fetch(`http://localhost:4000/books/title2/hunger/?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(searchInput);
          console.log(data);
          if(data.message){
            setBooks([]);
            setLastPage(1);
          } else {
            setBooks(data.books);
            setLastPage(data.pagination.totalPages);
            setSearch(false);
          }
          console.log(books);
        });
    }
  }, [search, currentPage, booksPerPage]);

  //Gets the books by title
  // const handleBooksByRelativeTitle = () => {
  //   fetch(`http://localhost:4000/books/title2/${searchInput}/?page=${currentPage}&limit=${booksPerPage}`, {
  //     method: "GET",
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       if(data.message){
  //         setBooks([]);
  //         setLastPage(1);
  //       } else {
  //         console.log(requestType);
  //         console.log(searchInput);
  //         console.log(searchLabel);
  //         console.log(data);
  //         setBooks(data.books);
  //         setLastPage(data.pagination.totalPages);
  //       }
  //     })
  // };

  const handleSearch = () => {
    //This is to see what to search for
    // if (requestType == "title"){
    //   console.log(requestType);
    //   handleBooksByTitle();

    // } 
    if (requestType == "relative title"){
      setSearch(true);

  //   } else if (event.target.value == "isbn"){
  //     setSearchLabel("Type the book's isbn");
  //   } else if (event.target.value == "relative author"){
  //     setSearchLabel("Type the book's relative author");
  //   } else if (event.target.value == "relative rating"){
  //     setSearchLabel("Type the book's relative rating");
  //   } else if (event.target.value == "release year"){
  //     setSearchLabel("Type the book's release year");
    }
  }

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

  // This handles the change on the type of request to search books.
  const handleRequestChange = (event: SelectChangeEvent) =>{
    setRequestType(event.target.value);

    //This is to change the label in the search box
    if(event.target.value == ""){
      setSearchLabel("Select a category to search for books");
    // } else if (event.target.value == "title"){
    //   setSearchLabel("Type the book's title");

    } else if (event.target.value == "relative title"){
      setSearchLabel("Type the book's relative title");

    } else if (event.target.value == "isbn"){
      setSearchLabel("Type the book's isbn");
    } else if (event.target.value == "relative author"){
      setSearchLabel("Type the book's relative author");
    } else if (event.target.value == "relative rating"){
      setSearchLabel("Type the book's relative rating");
    } else if (event.target.value == "release year"){
      setSearchLabel("Type the book's release year");
    }
  }

  return (
    <Container>
      <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
        <Box>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, backgroundColor: '#44475a' }}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
              <InputLabel style={{color: '#8be9fd'}}id="search-books-label">Search books by</InputLabel>
              <Select
                labelId="search-books-label"
                id="search-books"
                value={requestType}
                onChange={handleRequestChange}>
                <MenuItem value="">
                  <em>All books</em>
                </MenuItem>
                {/* <MenuItem value={"title"}>Title</MenuItem> */}
                <MenuItem value={"relative title"}>Relative Title</MenuItem>
                <MenuItem value={"isbn"}>Isbn</MenuItem>
                <MenuItem value={"relative author"}>Relative Author</MenuItem>
                <MenuItem value={"relative rating"}>Relative Rating</MenuItem>
                <MenuItem value={"release year"}>Release Year</MenuItem>
              </Select>
            </FormControl>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              // disabled={requestType == ""? true : false}
              placeholder= {searchLabel}
              inputProps={{ 'aria-label': 'search books'}}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />

            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" 
            onClick={handleSearch}
            >
              <SearchIcon color="info"/>
            </IconButton>
          </Paper>
        </Box>

        <Box sx={{ mt: 1 }}>
          <List>
            {books && books.map((book, index, books) => (
              <React.Fragment key={"book list item: " + index}>
                <Card style={{marginBottom: index < books.length - 1 ? 16 : 0}}>
                  <BookListItem book={book} onGetDetails={handleDetails} />
                </Card>
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
                inputProps={{ 'aria-label': 'Books per page' }}>
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