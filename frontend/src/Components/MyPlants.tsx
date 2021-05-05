import { Button, Container, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../http/Auth/auth-context";
import { getUserPlants } from "../http/PlantDataLoader";
import Plant from "../Models/Plant/Plant";
import { NewPlantDialog } from "./Dialogs/NewPlantDialog";
import PlantCard from "./PlantCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        root: {
            background: "rgb(232,232,232)",
        },
        newbutton: {
            marginTop: "2rem",
            marginBottom: "2rem",
        },
    }),
);


export const MyPlants = () => {
    const classes = useStyles();

    const [plants, setPlants] = useState<Plant[]>([]);
    const auth = useAuth();
    //const history = useHistory();

    const getMyPlants = async () => {
        const _plants = (await getUserPlants(auth.user!.username));
        if (_plants !== undefined)
            setPlants(_plants);
    }

    const [openDialog, setOpenDialog] = useState(false);

    const addNewPlant = () => {
        setOpenDialog(true);
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + auth.session?.token;
        getMyPlants();
    }, [openDialog]);

    return (
        <div>
            <NewPlantDialog
                title="New plant"
                openDialog={openDialog}
                setOpenDialog={() => setOpenDialog(!openDialog)}
            />
            <Container maxWidth="lg">
                <Button variant="contained" color="primary" onClick={addNewPlant} className={classes.newbutton} >New Plant</Button>
                {plants.length !== 0 &&
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
                    </Grid>}
            </Container>
        </div>
    );
}