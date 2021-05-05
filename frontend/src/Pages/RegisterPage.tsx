import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from '../http/Auth/auth-context';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                MyGarden App
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegisterPage() {
    const classes = useStyles();
    const { loading, error, signUp } = useAuth();

    const [{ first_name, last_name, username, email, password, repeatPassword }, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setInnerError("");
    }

    const [innerError, setInnerError] = useState('');

    // const [registered, setRegistered] = useState(false);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password === repeatPassword) {
            //perform API

            signUp({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                username: username
            })

            // if (response !== undefined) {
            //     setInnerError(response.description)
            // }
            // else if (response === undefined) {
            //     setRegistered(true);
            // }
        } else {
            setInnerError('Password and repeat password must match!');
        }
        console.log(error);
    }

    return (<>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(event) => setRegisterData({
                                    first_name: event.target.value,
                                    last_name,
                                    username,
                                    email,
                                    password,
                                    repeatPassword
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(event) => setRegisterData({
                                    first_name,
                                    last_name: event.target.value,
                                    username,
                                    email,
                                    password,
                                    repeatPassword
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={(event) => setRegisterData({
                                    first_name,
                                    last_name,
                                    username: event.target.value,
                                    email,
                                    password,
                                    repeatPassword
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(event) => setRegisterData({
                                    first_name,
                                    last_name,
                                    username,
                                    email: event.target.value,
                                    password,
                                    repeatPassword
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setRegisterData({
                                    first_name,
                                    last_name,
                                    username,
                                    email,
                                    password: event.target.value,
                                    repeatPassword
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password-again"
                                label="Password again"
                                type="password"
                                id="password-again"
                                autoComplete="current-password"
                                onChange={(event) => setRegisterData({
                                    first_name,
                                    last_name,
                                    username,
                                    email,
                                    password,
                                    repeatPassword: event.target.value
                                })}
                            />
                        </Grid>
                    </Grid>
                    <Snackbar open={innerError !== ""} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    </>
    );
}