import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';


import { useAuth } from "../http/Auth/auth-context";


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    back: {
        position: 'relative',
        top: 10,
        left: 10
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 100,
        color: '#fff',
    },
}));

export default function LoginPage() {
    const classes = useStyles();

    const { login, loading, error } = useAuth();

    const [{ username, password }, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [innerError, setInnerError] = useState('');

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setInnerError("");
    }


    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        login({ username, password });
        if (error !== undefined)
            setInnerError(error);
    }

    return (
        <>
            {loading &&
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
            <IconButton aria-label="go-back" color="primary" size="medium" className={classes.back} href="/">
                <ArrowBackIcon />
            </IconButton>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event) => setCredentials({
                                username: event.target.value,
                                password
                            })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => setCredentials({
                                username,
                                password: event.target.value
                            })}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
}