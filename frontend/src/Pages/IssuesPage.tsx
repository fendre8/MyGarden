import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, CircularProgress, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';

import MyNavbar from '../Components/MyNavbar';
import Issue from '../Models/Issue/Issue';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import plant1 from '../static/pics/issues/plant1.jpg';
import { NewIssueDialog } from '../Components/Dialogs/NewIssueDialog';
import { useHistory } from 'react-router';
import IssueAPI from "../http/IssueAPI";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        root: {
            height: "100%",
        },
        container: {
            marginTop: "2rem",
        },
        card: {
            display: 'flex',
            background: "rgb(232,232,232)",
            cursor: "pointer",
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        cardcontent: {
            // flex: '1 0 auto',
        },
        cover: {
            width: "150px",
            height: "150px"
        },
        newissuebutton: {
            marginTop: "2rem",
        },
        heading: {
            marginTop: "2rem",
            marginBottom: "2rem",
            fontWeight: "bold",
        }
    }),
);

function IssuesPage() {
    const classes = useStyles();
    const history = useHistory();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [isloading, setIsloading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        async function getIssues() {
            const _issues = await IssueAPI.getAllIssues();
            if (_issues) {
                setIssues(_issues);
            }
            setIsloading(false);
        }
        getIssues();
    }, []);

    const handleNewIssue = () => {
        setOpenDialog(true);
    }

    function handleCardClick(id: number) {
        history.push(`/issues/${id}`);
    }

    const IssueCard = (props: { issue: Issue }) => {

        return (
            <Card className={classes.card} onClick={() => handleCardClick(props.issue.id)}>
                <CardMedia
                    className={classes.cover}
                    image={plant1}
                />
                <div className={classes.details} >
                    <CardContent className={classes.cardcontent}>
                        <Box display="flex" flexDirection="row">
                            <Box>
                                <Typography component="h5" variant="h5" >
                                    {props.issue.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" >
                                    {props.issue.author.username}
                                </Typography>
                                <Typography>
                                    {props.issue.description}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </div>
            </Card>
        );
    }

    return (
        <div className={classes.root}>
            <MyNavbar />
            <div>
                <NewIssueDialog
                    title="New issue"
                    openDialog={openDialog}
                    setOpenDialog={() => setOpenDialog(!openDialog)}
                />
                <Container maxWidth="md" className={classes.container} >
                    <Button variant="contained" color="primary" className={classes.newissuebutton} onClick={() => handleNewIssue()}>New issue</Button>
                    <Typography variant="h4" component="h2" className={classes.heading}>
                        Open Issues
                    </Typography>
                    <Grid container spacing={3}>
                        {isloading ? (<CircularProgress />)
                            : issues.filter(issue => issue.is_open).map(issue => (
                                <Grid item xs={12} key={issue.id}>
                                    <IssueCard issue={issue} />
                                </Grid>
                            ))}
                    </Grid>
                    {(issues.filter(issue => !issue.is_open).length !== 0) &&
                        (<>
                            <Typography variant="h4" component="h2" className={classes.heading}>
                                Solved
                        </Typography>
                            <Grid container spacing={3}>
                                {isloading ? (<CircularProgress />)
                                    : issues.filter(issue => !issue.is_open).map(issue => (
                                        <Grid item xs={12} key={issue.id}>
                                            <IssueCard issue={issue} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </>)}
                </Container>
            </div>
        </div>
    );
}

export default IssuesPage;