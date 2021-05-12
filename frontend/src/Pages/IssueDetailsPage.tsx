import { useHistory, useParams } from "react-router-dom";
import MyNavbar from "../Components/MyNavbar";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Fab, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import Issue from "../Models/Issue/Issue";

import plant1 from '../static/pics/issues/plant1.jpg';
import IssueAPI from "../http/IssueAPI";
import Answer from "../Models/Issue/Answer";
import answerAPI from "../http/answerAPI";
import { useAuth } from "../http/Auth/auth-context";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "2rem",
        backgroundColor: "rgb(232,232,232)",
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
    },
    saveButton: {
        marginTop: "1rem",
    },
    answerPaper: {
        padding: "0.5rem",
    }
}));


export function IssueDetailsPage() {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const auth = useAuth();
    const history = useHistory();

    const [issue, setIssue] = useState<Issue>();
    const [userAnswer, setUserAnswer] = useState("");
    const [editable, setEditable] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getIssue(id: number) {
            const issue = await IssueAPI.getIssueById(id);
            setIssue(issue);
            if (issue?.author.id === auth.session?.user.id) {
                setEditable(true);
            }
            if (issue)
                setIsOpen(issue.is_open); 
            setIsLoading(false);
        }
        getIssue(parseInt(id));
    }, [id, isLoading])

    const handleSaveAnswer = async () => {
        if (userAnswer === "") return;
        console.log(userAnswer);
        const userId = auth.session!.user.id;
        const answer = await answerAPI.addNewAnswer(parseInt(id), userAnswer, userId);
        setUserAnswer("");
        issue?.answers.push(answer);
        setIsLoading(true);
    }

    //TODO put issue whether isOpen
    const handleIsOpen = async () => {
        setIsOpen(!isOpen);
        await IssueAPI.toggleIssueIsOpen(parseInt(id));
        history.goBack();
    }

    const AnswerItem = (props: { answer: Answer }) => {

        return (
            <Grid item container direction="column" alignItems={(props.answer.author === auth.session?.user.username) ? "flex-end" : "flex-start"}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.answerPaper} >
                        <Typography variant="h6">
                            {props.answer.author}
                        </Typography>
                        <Typography variant="body1">
                            {props.answer.text}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return (
        <div>
            <MyNavbar />
            { issue &&
                <Container maxWidth="md">
                    <Paper className={classes.paper} >
                        <Box display="flex" flexDirection="row" className={classes.firstBox}>
                            <img src={issue.image_path ? issue.image_path : plant1} className={classes.image} alt="" />
                            <Box display="flex" justifyContent="space-between" flexGrow={1}>
                                <Box display="flex" flexDirection="column" className={classes.headings} alignItems="flex-start">
                                    <Typography variant="h4" className={classes.bold}>
                                        {issue.title}
                                    </Typography>
                                    <Typography variant="h5">
                                        {issue.plant.name}
                                    </Typography>
                                    <Typography variant="h5" className={classes.italic}>
                                        Author: {issue.author.username}
                                    </Typography>
                                </Box>
                                {editable &&
                                    <Box >
                                        <Fab color="primary" aria-label="toggle-open" onClick={handleIsOpen}>
                                            {isOpen ? <DoneIcon /> : <CancelIcon />}
                                        </Fab>
                                    </Box>
                                }
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" className={classes.secondBox}>
                            <Typography variant="h6">
                                Description
                            </Typography>
                            <Typography variant="body1">
                                {issue.description}
                            </Typography>
                            <hr></hr>
                            {issue.answers.length > 0 && <>
                                <Typography variant="h6">
                                    Answers:
                                </Typography>
                                <Grid container spacing={1}>
                                    {issue.answers.map((answer) => (
                                        <AnswerItem key={answer.id} answer={answer} />
                                    ))}
                                </Grid>
                            </>
                            }
                            <Typography variant="h6">
                                Your answer:
                            </Typography>
                            <TextField
                                id="user-answer"
                                variant="filled"
                                multiline
                                rows={4}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                value={userAnswer}
                            />
                            <Box alignSelf="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.saveButton}
                                    onClick={handleSaveAnswer}
                                >
                                    Save
                            </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            }
        </div>
    );
}