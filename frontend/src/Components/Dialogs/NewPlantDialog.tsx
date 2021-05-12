import { Button } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import React from "react";
import { useAuth } from "../../http/Auth/auth-context";
import { addNewPlant } from "../../http/PlantDataLoader";

type DialogProps = {
    title: string,
    openDialog: boolean,
    setOpenDialog: () => void
};

export const NewPlantDialog = (props: DialogProps) => {
    const auth = useAuth();

    //const [open, setOpen] = React.useState(false);
    const [plantName, setPlantName] = React.useState("");
    const [plantTime, setPlantTime] = React.useState(new Date().toISOString().split('T')[0]);

    const handleClose = () => {
        props.setOpenDialog();
    };

    const handleNewPlant = async () => {
        handleClose();
        const plant = await addNewPlant(auth.user!.username, plantName, plantTime);
    }

    return (
        <div>
            <Dialog open={props.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Please enter the plant name
                  </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="plant"
                        label="Plant name"
                        type="none"
                        fullWidth
                        onChange={ (e) => setPlantName(e.target.value)}
                    />
                    <TextField
                        id="date"
                        label="Plant time"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={ (e) => setPlantTime(e.target.value)}
                        defaultValue={new Date().toISOString().split('T')[0]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                  </Button>
                    <Button onClick={handleNewPlant} color="primary">
                        Add
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};