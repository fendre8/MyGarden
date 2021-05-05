import React, { useEffect, useState } from 'react';
import { Button, Container, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import MyNavbar from '../Components/MyNavbar';
import { useAuth } from '../http/Auth/auth-context';
import { deleteFriend, getUserByName } from '../http/ProfileDataLoader';
import User from '../Models/User/User';
import { FriendInviteDialog } from '../Components/Dialogs/FriendInviteDialog';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        root: {
            background: "rgb(232,232,232)",
            height: "100%",
        },
        newfriendbutton: {
            marginTop: "2rem",
        },
    }),
);

function FriendsPage() {
    const classes = useStyles();

    const auth = useAuth();

    const [friends, setFriends] = useState<string[]>([]);
    const [user, setUser] = useState<User>();
    const [isLoading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const removeFriend = async (rowId: number) => {
        const arrayCopy = friends.filter((row, id) => id !== rowId);
        setFriends(arrayCopy);
        if (auth.session) {
            await deleteFriend(auth.session.user.username, friends[rowId]);
        }
    }

    const handleInviteFriend = () => {
        setOpenDialog(true);
    }

    useEffect(() => {
        async function getfriends() {
            if (auth.session) {
                const _user = await getUserByName(auth.user!.username);
                setUser(_user);
                if (_user.friends !== undefined) {
                    setFriends(_user.friends);
                    setLoading(false);
                }
            }
        }
        getfriends();
    }, []);

    return (
        <div>
            <MyNavbar />
            <FriendInviteDialog
                title="New friend"
                openDialog={openDialog}
                setOpenDialog={() => setOpenDialog(!openDialog)}
            />
            <Container>
                <Button variant="contained" color="primary" className={classes.newfriendbutton} onClick={() => handleInviteFriend()}>Invite friend</Button>
                <h2>Friends</h2>
                {isLoading && <CircularProgress />}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Friend name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Plants</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {friends && friends.map((friend, idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                        {friend}
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" color="secondary" onClick={() => removeFriend(idx)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>Friend requests</h2>
            </Container>
        </div>
    );
}

export default FriendsPage;