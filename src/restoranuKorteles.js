import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import img1 from './Nuotraukos/food1.png'
import img2 from './Nuotraukos/pizza.PNG'
import { Outlet, Link } from "react-router-dom";
export default function ActionAreaCard() {
  return (
    <div>
    <Card sx={{ maxWidth:  700, margin: 'auto', marginTop: 5}}>
      <CardActionArea component={Link} to={'/restoranai'}>
        <CardMedia
          component="img"
          height="200"
          image={img2}
          alt="sth"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bili Bizza
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Skaniausios picos Kaune! Mėgaukis tikra itališka pica iš namų patogumo.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
     <Card sx={{ maxWidth:  700, margin: 'auto', marginTop: 5}}>
     <CardActionArea component={Link} to={'/restoranai'}>
       <CardMedia
         component="img"
         height="200"
         image={img1}
         alt="green iguana"
       />
       <CardContent>
         <Typography gutterBottom variant="h5" component="div">
           Bauda
         </Typography>
         <Typography variant="body2" color="text.secondary">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         </Typography>
       </CardContent>
     </CardActionArea>
   </Card>
   </div>
  );
}