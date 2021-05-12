import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Plant from '../Models/Plant/Plant';
import { useHistory } from 'react-router';
import { useAuth } from '../http/Auth/auth-context';

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


export default function PlantCard(props: { plant: Plant, public: boolean }) {
  const classes = useStyles();
  const history = useHistory();
  const [imagePath, setImagePath] = useState("");
  const auth = useAuth();

  const handleClickOnPlant = () => {
    if (props.public)
      history.push(`/plant/public/${props.plant.id}`);
    else
      history.push(`/plant/${props.plant.id}`);
  }

  return (<>
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleClickOnPlant()}>
        <CardMedia
          className={classes.media}
          image={props.plant.img_url}
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
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleClickOnPlant()}>
          Show
        </Button>
      </CardActions>
    </Card>
  </>
  );
}