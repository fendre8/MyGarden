import React, { useEffect, useState } from "react";
import { Box, Container, createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import MyNavbar from "../Components/MyNavbar";
import { useAuth } from "../http/Auth/auth-context";
import { getUserByName } from "../http/ProfileDataLoader";
import User from "../Models/User/User";

import default_profile_pic from "../static/pics/profiles/default_profile_pic.jpg";
import PlantCard from "../Components/PlantCard";
import Plant from "../Models/Plant/Plant";
import { getUserPlants } from "../http/PlantDataLoader";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        main: {
            marginTop: "3rem",
        },
        root: {
            height: "100%",
        },
        firstBox: {
            padding: "1rem",
        },
        userpic: {
            marginRight: "1rem",
            width: "25%",
            height: "auto",
        },
        plantPaper: {
            marginTop: "2rem",
        },
        plantsHeading: {
            marginTop: "1rem",
            marginBottom: "2rem",
        }
    }),
);

export const DataSheetPage = () => {
    const classes = useStyles();
    const auth = useAuth();
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User>();
    const [plants, setPlants] = useState<Plant[]>();

    useEffect(() => {
        async function getPublicUser(username: string) {
            const _user = await getUserByName(username);
            if (_user) {
                setUser(_user);
            }
        }
        getPublicUser(username);
    }, [])

    useEffect(() => {
        async function getPlants(username: string) {
            const _plants = await getUserPlants(username);
            if (_plants) {
                setPlants(_plants);
            }
        }
        getPlants(username);
    }, [])


    return (
        <div>
            <MyNavbar />
            <Container maxWidth="md">
                <Box className={classes.main}>
                    {user && <>
                        <Paper>
                            <Box display="flex" className={classes.firstBox}>
                                <img src={default_profile_pic} alt="" className={classes.userpic} />
                                <Box display="flex" flexDirection="column">
                                    <Typography variant="h3">
                                        Username: {user.username}
                                    </Typography>
                                    {(user.first_name && user.last_name) &&
                                        <Typography variant="h3">
                                            Name: {user.first_name} {user.last_name}
                                        </Typography>
                                    }
                                    <Typography variant="h4">
                                        Email: {user.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper className={classes.plantPaper}>
                            <Box display="flex" flexDirection="column">
                                <Box alignSelf="center" className={classes.plantsHeading}>
                                    <Typography variant="h3">
                                        Plants
                                    </Typography>
                                </Box>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} >
                                        <Grid container justify="center" spacing={3} >
                                            {plants?.map((plant, idx) => (
                                                <Grid key={idx} item>
                                                    <PlantCard plant={plant} public={false} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </>
                    }
                </Box>
            </Container>
        </div>);
}