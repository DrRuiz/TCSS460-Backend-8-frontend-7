"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputBase, InputLabel, List, MenuItem, Pagination, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, styled } from "@mui/material";
import { Widgets } from "@mui/icons-material";

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Find() {

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [booksPerPage, setBooksPerPage] = React.useState(10);
  const [lastPage, setLastPage] = React.useState(10);
  const [requestType, setRequestType] = React.useState("");
  const [searchLabel, setSearchLabel] = React.useState("Select a category to search for books");
  const [searchInput, setSearchInput] = React.useState("");
  const [releaseYearOption, setReleaseYearOption] = React.useState("");
  const [allBooksOption, setAllBooksOption] = React.useState("");
  const [openDetails, setOpenDetails] = React.useState(false);
  const [currentBook, setCurrentBook] = React.useState<IBook>();

  //User effect for getting all the books.
  React.useEffect(() => {
    if(requestType === "" && allBooksOption === "alphabetical title"){
      fetch(`http://localhost:4000/books/SortAZ?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.entries);
          setLastPage(data.pagination.totalPages);
        });
    } else if(requestType === "" && allBooksOption === "new to old publication date"){
      fetch(`http://localhost:4000/books/date/SortNewest2/?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.entries);
          setLastPage(data.pagination.totalPages);
        });
    } else if(requestType === "" && allBooksOption === "old to new publication date"){
      fetch(`http://localhost:4000/books/date/SortOldest2/?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.entries);
          setLastPage(data.pagination.totalPages);
        });
    } else if(requestType === ""){
      fetch(`http://localhost:4000/books/all2?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.books);
          setLastPage(data.pagination.totalPages);
        });
    }
  }, [requestType, currentPage, booksPerPage, allBooksOption]);

  //User effect for the get by relative title
  React.useEffect(() => {
    if(requestType === "relative title"){
      fetch(`http://localhost:4000/books/title2/${searchInput}/?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message){
            setBooks([]);
            setLastPage(1);
          } else {
            setBooks(data.entries);
            setLastPage(data.pagination.totalPages);
          }
        });
    }
  }, [searchInput, currentPage, booksPerPage]);

  //User effect for the get by ISBN
  React.useEffect(() => {
    if(requestType === "isbn"){
      fetch(`http://localhost:4000/books/isbn/${searchInput}/?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message){
            setBooks([]);
            setLastPage(1);
          } else {
            setBooks(data.entries);
            setLastPage(data.pagination.totalPages);
          }
        });
    }
  }, [searchInput, currentPage, booksPerPage]);

  //User effect for the get by relative author
  React.useEffect(() => {
    if(requestType === "relative author"){
      fetch(`http://localhost:4000/books/all/author/${searchInput}/?page=${currentPage}&limit=${booksPerPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message){
            setBooks([]);
            setLastPage(1);
          } else {
            setBooks(data.entries);
            setLastPage(data.pagination.totalPages);
          }
        });
    }
  }, [searchInput, currentPage, booksPerPage]);

    //User effect for the get by relative rating
    React.useEffect(() => {
      if(requestType === "relative rating"){
        fetch(`http://localhost:4000/books/rating2/${searchInput}/?page=${currentPage}&limit=${booksPerPage}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.message){
              setBooks([]);
              setLastPage(1);
            } else {
              setBooks(data.entries);
              setLastPage(data.pagination.totalPages);
            }
          });
      }
    }, [searchInput, currentPage, booksPerPage]);

        //User effect for the get by release year
        React.useEffect(() => {
          if(requestType === "release year" && releaseYearOption === "newer than this release year"){
            fetch(`http://localhost:4000/books/year/${searchInput}/newer2/?page=${currentPage}&limit=${booksPerPage}`, {
              method: "GET",
            })
              .then((res) => res.json())
              .then((data) => {
                if(data.message){
                  setBooks([]);
                  setLastPage(1);
                } else {
                  setBooks(data.entries);
                  setLastPage(data.pagination.totalPages);
                }
              });
          } else if(requestType === "release year" && releaseYearOption === "older than this release year"){
            fetch(`http://localhost:4000/books/year/${searchInput}/older2/?page=${currentPage}&limit=${booksPerPage}`, {
              method: "GET",
            })
              .then((res) => res.json())
              .then((data) => {
                if(data.message){
                  setBooks([]);
                  setLastPage(1);
                } else {
                  setBooks(data.entries);
                  setLastPage(data.pagination.totalPages);
                }
              });
          } else if(requestType === "release year"){
            fetch(`http://localhost:4000/books/year2/${searchInput}/?page=${currentPage}&limit=${booksPerPage}`, {
              method: "GET",
            })
              .then((res) => res.json())
              .then((data) => {
                if(data.message){
                  setBooks([]);
                  setLastPage(1);
                } else {
                  setBooks(data.entries);
                  setLastPage(data.pagination.totalPages);
                }
              });
          }
        }, [searchInput, currentPage, booksPerPage, releaseYearOption]);

  //Loads the details page
  // const handleDetails = ({book}: {book: IBook}) => {
  //   // fetch("http://localhost:4000/bookDetails/" + {/*Book title? */}, {
  //   //   method: "GET", // *GET, POST, PUT, DELETE, etc.
  //   // }).then(
  //   //   // (res) => res.ok && setMessages(messages.filter((msg) => msg.name != name))
  //   // );
  // };

  //Handles the opening of the details
  const handleOpenDetails = ({book}: {book: IBook}) => {
    setOpenDetails(true);
    setCurrentBook(book);
  };

  //Handles the closing of the details
  const handleCloseDetails = () => {
    setOpenDetails(false);
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
      setAllBooksOption("");

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
      setReleaseYearOption("");
    }
  }

    //Handles the change of books per page.
    const handleReleaseYearOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
      setReleaseYearOption((event.target as HTMLInputElement).value);
    };

        //Handles the change of books per page.
    const handleAllBooksOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAllBooksOption((event.target as HTMLInputElement).value);
    };

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
              <InputLabel style={{color: '#8be9fd'}} id="search-books-label">Search books by</InputLabel>
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

            {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search" 
            onClick={handleSearch}
            >
              <SearchIcon color="info"/>
            </IconButton> */}
          </Paper>
        </Box>

        <Box sx={{ mt: 1, display: "flex", flexDirection: "row"}}>
          <FormControl sx={{mr: 8}}>
          <FormLabel sx={{mt: 2}} style={{color: '#8be9fd'}} id="release year radio buttons">All Books Options (available when searching by all books)</FormLabel>
            <RadioGroup
              sx={{mt: 1, ml: 2, mb: 2}}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value= {requestType !== "" ? "disabled" : allBooksOption}
              onChange={handleAllBooksOptions}
            >
              <FormControlLabel value="alphabetical title" control={<Radio />} label="Sort book titles alphabetically" />
              <FormControlLabel value="new to old publication date" control={<Radio />} label="Sort book publication dates from newest to oldest" />
              <FormControlLabel value="old to new publication date" control={<Radio />} label="Sort book publication dates form oldest to newest" />
            </RadioGroup>
            <Divider style={{backgroundColor: 'white'}} />
            <FormLabel sx={{mr: 2, mt: 2}} style={{color: '#8be9fd'}} id="release year radio buttons">Released Year Options (available when searching by release year)</FormLabel>
            <RadioGroup
              sx={{mt: 1, ml: 2, mb:2}}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value= {requestType !== "release year" ? "disabled" : releaseYearOption}
              onChange={handleReleaseYearOptions}
            >
              <FormControlLabel value="this release year" control={<Radio />} label="Books of this release year" />
              <FormControlLabel value="newer than this release year" control={<Radio />} label="Books newer than this release year" />
              <FormControlLabel value="older than this release year" control={<Radio />} label="Books older than this release year" />
            </RadioGroup>
          </FormControl>
          <List>
            {books && books.map((book, index, books) => (
              <React.Fragment key={"book list item: " + index}>
                <Card style={{marginBottom: index < books.length - 1 ? 16 : 0}}>
                  <BookListItem book={book} onGetDetails={handleOpenDetails} />
                </Card>
              </React.Fragment>
            ))}
          </List>

          <React.Fragment>
            <BootstrapDialog
              onClose={handleCloseDetails}
              aria-labelledby="customized-dialog-title"
              open={openDetails}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="Book's title">
                {currentBook?.title}
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseDetails}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.primary,
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers sx={{width: "35vw", display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Typography gutterBottom>
                    ISBN: {currentBook?.isbn13}
                  </Typography>
                  <Typography gutterBottom>
                    Authors: {currentBook?.authors}
                  </Typography>
                  <Typography gutterBottom>
                    Publication Year: {currentBook?.publication_year}
                  </Typography>
                  <Typography gutterBottom>
                    Original Title: {currentBook?.original_title}
                  </Typography>
                  <Typography gutterBottom>
                    Title: {currentBook?.title}
                  </Typography>
                  <Typography gutterBottom>
                    Average Rating: {currentBook?.rating_avg}
                  </Typography>
                  <Typography gutterBottom>
                    Total ratings: {currentBook?.rating_count}
                  </Typography>
                  <Typography gutterBottom>
                    One Star Ratings: {currentBook?.rating_1_star}
                  </Typography>
                  <Typography gutterBottom>
                    Two Star Ratings: {currentBook?.rating_2_star}
                  </Typography>
                  <Typography gutterBottom>
                    Three Star Ratings: {currentBook?.rating_3_star}
                  </Typography>
                  <Typography gutterBottom>
                    Four Star Ratings: {currentBook?.rating_4_star}
                  </Typography>
                  <Typography gutterBottom>
                    Five Star Ratings: {currentBook?.rating_5_star}
                  </Typography>
                </div>
                <img src={currentBook?.image_url} alt="The book's cover" style={{width: '200px', height: '300px', marginLeft: '10px'}} />
              </DialogContent>
            </BootstrapDialog>
          </React.Fragment>
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