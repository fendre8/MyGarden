import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Plant from '../Models/Plant/Plant';
import { ButtonBase } from '@material-ui/core';
import { Redirect } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200
  },
  italic: {
    fontStyle: "italic"
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  },
});


export default function PlantCard(props: { plant: Plant }) {
  const classes = useStyles();
  const [details, setDetails] = useState(false);

  const handleClickOnPlant = () => {
    setDetails(true);
  }

  return (<>
    {details && <Redirect to={`/plant/${props.plant.name.replace(" ", "-")}`} /> }
    <Card className={classes.root}>
      <ButtonBase
        className={classes.cardAction}
        onClick={() => {
          handleClickOnPlant()
        }}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.plant.thumbnail_url}
            title={props.plant.name}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.plant.name.charAt(0).toUpperCase() + props.plant.name.slice(1)}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="h3" className={classes.italic}>
              {props.plant.scientific_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.plant.description.substr(0, 400) + "..."}
            </Typography>
          </CardContent>
        </CardActionArea>
      </ButtonBase>
      <CardActions>
        <Button size="small" color="primary">
          Show
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  </>
  );
}