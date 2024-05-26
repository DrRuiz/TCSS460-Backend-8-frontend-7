import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarsIcon from '@mui/icons-material/Stars';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function BooksLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <IconButton color="inherit" href="/books/">
            TCSS 460 Book DB
            </IconButton>
            
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" }}}>
            <IconButton href="/books/find" color="inherit">
              <Typography variant="h6" component="h1" sx={{marginRight: "0.2em"}}>
              Find Books 
              </Typography>
              
              <MenuBookIcon sx={{marginRight: "1em"}}/>
            </IconButton>
            <IconButton href="/books/addBook" color="inherit">
            <Typography variant="h6" component="h1" sx={{marginRight: "0.2em"}}>
              Add Book
              </Typography>
              <AddCircleIcon sx={{marginRight: "1em"}}/>
            </IconButton>
            <IconButton href="/books/addRating" color="inherit">
            <Typography variant="h6" component="h1" sx={{marginRight: "0.2em"}}>
              Add Ratings
              </Typography>
              <StarsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </section>
  );
}
