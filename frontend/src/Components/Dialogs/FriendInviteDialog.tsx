import { Button } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import React from "react";
import { useAuth } from "../../http/Auth/auth-context";
import { inviteFriend } from "../../http/ProfileDataLoader";

type DialogProps = {
    title: string,
    openDialog: boolean,
    setOpenDialog: () => void,
    setLoading: () => void
};

export const FriendInviteDialog = (props: DialogProps) => {
    const auth = useAuth();

    //const [open, setOpen] = React.useState(false);
    const [friendName, setfriendName] = React.useState("");

    const handleClose = () => {
        props.setOpenDialog();
    };

    const handleNewFriendInvite = async () => {
        handleClose();
        if (auth.user) {
            const friendship = await inviteFriend(auth.user.username, friendName).then(() => props.setLoading());
        }
    }

    return (
        <div>
            <Dialog open={props.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Please enter your friend name
                  </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="plant"
                        label="Username"
                        type="none"
                        fullWidth
                        onChange={ (e) => setfriendName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                  </Button>
                    <Button onClick={handleNewFriendInvite} color="primary">
                        Add
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};