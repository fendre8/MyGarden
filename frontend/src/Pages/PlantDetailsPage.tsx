import { useParams } from "react-router-dom";
import Plant from "../Models/Plant/Plant";
import MyNavbar from "../Components/MyNavbar";
import React, { useEffect, useState } from "react";
import { getPlantById } from "../http/PlantDataLoader";
import { Box, Container, makeStyles, Paper, Typography } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "2rem",
        marginBottom: "2rem",
        paddingBottom: "1rem",
    },
    image: {
        width: "30%",
        height: "auto",
    },
    headings: {
        marginLeft: "2rem",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
    firstBox: {
        paddingTop: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
    },
    secondBox: {
        paddingTop: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
    }
}));


export default function PlantDetailsPage() {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();

    const [plant, setPlant] = useState<Plant>();

    useEffect(() => {
        async function getPlant(id: number) {
            const plant = await getPlantById(id);
            setPlant(plant);
        }
        getPlant(parseInt(id));
    }, [id])

    return (
        <div>
            <MyNavbar />
            { plant &&
                <Container maxWidth="md">
                    <Paper className={classes.paper} >
                        <Box display="flex" flexDirection="row" className={classes.firstBox}>
                            <img src={plant.img_url} className={classes.image} alt=""/>
                            <Box display="flex" flexDirection="column" className={classes.headings} alignItems="flex-start">
                                <Typography variant="h3" className={classes.bold}>
                                    {plant.name}
                                </Typography>
                                <Typography variant="h4" className={classes.italic}>
                                    {plant.scientific_name}
                                </Typography>
                                <Typography variant="h5" >
                                    {plant.plant_time && (<>Plant time: {moment(plant.plant_time).format('YYYY-MM-DD')}</>)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" className={classes.secondBox}>
                            <Typography variant="h6">
                                Description
                            </Typography>
                            <Typography variant="body1">
                                {plant.description}
                            </Typography>
                            <Typography variant="h6">
                                Median lifespan: {plant.median_lifespan}
                            </Typography>
                            <Typography variant="h6">
                                First harvest expected: {plant.first_harvest_exp}
                            </Typography>
                            <Typography variant="h6">
                                Last harvest expected: {plant.last_harvest_exp}
                            </Typography>
                            <Typography variant="h6">
                                Height: {plant.height}
                            </Typography>
                            <Typography variant="h6">
                                Spread: {plant.spread}
                            </Typography>
                            <Typography variant="h6">
                                Row spacing: {plant.row_spacing}
                            </Typography>
                            <Typography variant="h6">
                                Sun requirements: {plant.sun_requirements}
                            </Typography>
                            <Typography variant="h6">
                                Sowing method
                            </Typography>
                            <Typography variant="body1">
                                {plant.sowing_method}
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            }
        </div>
    );
}