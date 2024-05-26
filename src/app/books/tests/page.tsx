"use client";
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


export default function BottomAppBar() {
    const [value, setValue] = React.useState<number | null>(5);
  return (
    <React.Fragment>
<ListItem>
    <ListItemAvatar>
        <Avatar src="https://img.icons8.com/?size=100&id=vjFyFt0Q4PdI&format=png&color=8be9fd" variant="square"
        sx={{width: "98px", height: "146px", marginRight: "1em", border: "3px solid", borderColor: "secondary.main"}}/>
    </ListItemAvatar>
    <ListItemText
    primaryTypographyProps={{fontSize: '24px'}}
    secondaryTypographyProps={{fontSize: '20px'}}
    primary={"The Hunger Games"}
    secondary={"By " + "Suzanne Collins"}
    />
</ListItem>

<br />
<br />
<br />
<Container sx={{position: "absolute", left: "0%"}}>
<Box component="img" src="https://images.gr-assets.com/books/1474154022m/3.jpg" 
sx={{border: "3px solid", borderColor: "secondary.main", float: "left", marginRight: "1em"}} 
/>
<Typography sx={{fontSize: '24px'}}>
    Harry Potter and the Sorcerer's Stone (Harry Potter #1)
</Typography>
<Typography sx={{fontSize: '12px', color: "text.secondary"}}>
    ISBN: 919241982418
    <br />
    <br />
</Typography>
<Typography sx={{fontSize: '18px'}}>
    By J.K. Rowling - Published 2001
    <br />
</Typography>
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
</Container>
</React.Fragment>
    
  );
}