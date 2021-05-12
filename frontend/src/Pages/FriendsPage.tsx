import React, { useEffect, useState } from 'react';
import { Button, Container, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import MyNavbar from '../Components/MyNavbar';
import { useAuth } from '../http/Auth/auth-context';
import { deleteFriend, getUserByName, getUserFriendsByName } from '../http/ProfileDataLoader';
import User from '../Models/User/User';
import { FriendInviteDialog } from '../Components/Dialogs/FriendInviteDialog';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

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

export const FriendsPage = () => {
    const classes = useStyles();
    const auth = useAuth();

    const [user, setUser] = useState<User>();
    const [friends, setFriends] = useState<User[]>([]);

    const [isLoading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const removeFriend = async (rowId: number) => {
        const arrayCopy = friends.filter((row, id) => id !== rowId);
        setFriends(arrayCopy);
        if (auth.session) {
            await deleteFriend(auth.session.user.username, friends[rowId].username);
        }
    }

    const getFriends = async () => {
        if (auth.session) {
            const _friends = await getUserFriendsByName(auth.session.user.username);
            if (_friends) {
                setFriends(_friends);
                setLoading(false);
            }
        }
    }

    const handleInviteFriend = () => {
        setOpenDialog(true);
    }

    useEffect(() => {
        getFriends();
        console.log(friends);
    }, [auth.session, isLoading]);

    return (
        <div>
            <MyNavbar />
            <FriendInviteDialog
                title="New friend"
                openDialog={openDialog}
                setOpenDialog={() => setOpenDialog(!openDialog)}
                setLoading={() => setLoading(true)}
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
                            {friends.length !== 0 && <>
                                {friends.map((friend, idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/datasheet/${friend.username}`}>{friend.username}</Link>
                                    </TableCell>
                                    <TableCell>
                                        {friend.email}
                                    </TableCell>
                                    <TableCell>
                                        {friend.plants?.length}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" color="secondary" onClick={() => removeFriend(idx)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>))}
                            </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>Friend requests</h2>
            </Container>
        </div>
    );
}

export default FriendsPage;