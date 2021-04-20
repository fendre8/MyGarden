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


import { onRegister } from '../http/Auth/auth.api';
import { Redirect } from 'react-router-dom';

// const RegisterPage = () => {
//     return (
//         <AuthForm onSubmit={register}>
//             <label htmlFor="username">Username</label>
//             <input value={username} name="username" placeholder="Username" onChange={(event) => setRegisterData({
//                 username: event.target.value,
//                 email,
//                 password,
//                 repeatPassword
//             })} />
//             <label htmlFor="emial">Email</label>
//             <input value={email} name="emial" placeholder="Email" onChange={(event) => setRegisterData({
//                 username,
//                 email: event.target.value,
//                 password,
//                 repeatPassword
//             })} />
//             <label htmlFor="password">Password</label>
//             <input value={password} name="password" type="password" placeholder="Password" onChange={(event) => setRegisterData({
//                 username,
//                 email,
//                 password: event.target.value,
//                 repeatPassword
//             })} />
//             <label htmlFor="username">Repeat password</label>
//             <input value={repeatPassword} name="repeatPassword" type="password" placeholder="Password again" onChange={(event) => setRegisterData({
//                 username,
//                 email,
//                 password,
//                 repeatPassword: event.target.value
//             })} />
//             <button type="submit">Register</button>
//             {error.length > 0 && <p>{error}</p>}
//         </AuthForm>
//     )
// }


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

    const [{ first_name, last_name, username, email, password, repeatPassword }, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [error, setError] = useState('');

    const register = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password === repeatPassword) {
            //perform API
            const response = await onRegister({ first_name, last_name, username, email, password })

            if (response && response.error) {
                setError(response.error)
            }
            else if (response !== undefined) {
                <Redirect to='/login'/>
            }
        } else {
            setError('Password and repeat password must match!');
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={register}>
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
    );
}