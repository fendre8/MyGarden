import React, { useEffect, useState } from 'react'
import { Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import MyNavbar from '../Components/MyNavbar';
import PlantCard from '../Components/PlantCard';
import { PlantsProvider } from '../Components/PlantsContext';
import Plant from '../Models/Plant/Plant';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        root: {
            background: "rgb(232,232,232)",
        }
    }),
);

function MainPage() {
    const classes = useStyles();

    // const { user, logout } = useAuth();

    const [plants, setPlants] = useState<Plant[]>([]);
    const [search, setSearch] = useState("");

    const showResult = (plants: Plant[] | undefined, search: string) => {
        if (plants !== undefined) {
            setPlants(plants);
            setSearch(search);
        }
    }

    useEffect(() => {
    }, [plants])

    return (
        <div className={classes.root}>
            <PlantsProvider>
                <MyNavbar sendSearchResult={showResult} />
                <Container maxWidth="lg">
                    {plants.length !== 0 && <h2>Search result for {search}: {plants.length}</h2>}
                    <Grid container className={classes.grid} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={3} >
                                {plants.map(plant => (
                                    <Grid key={plant.id} item>
                                        <PlantCard plant={plant} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </PlantsProvider>
        </div>
    );
}

export default MainPage;