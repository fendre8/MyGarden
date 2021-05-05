import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import MyNavbar from '../Components/MyNavbar';
import { MyPlants } from '../Components/MyPlants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        root: {
            background: "rgb(232,232,232)",
            height: "100%",
        }
    }),
);

function PlantsPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MyNavbar />
            <MyPlants />
        </div>
    );
}

export default PlantsPage;