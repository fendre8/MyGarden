import { Theme } from "@material-ui/core";
import { Button, createStyles, makeStyles } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import React from "react";
import { useAuth } from "../../http/Auth/auth-context";
import { getUserPlants } from "../../http/PlantDataLoader";
import { addNewIssue } from "../../http/ProfileDataLoader";
import NewIssueData from "../../Models/Issue/NewIssueData";
import Plant from "../../Models/Plant/Plant";

type DialogProps = {
    title: string,
    openDialog: boolean,
    setOpenDialog: () => void
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        uploadbutton: {
            marginTop: "1rem",
        },
    }),
);


export const NewIssueDialog = (props: DialogProps) => {
    const classes = useStyles();
    const auth = useAuth();

    //const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [plantName, setPlantName] = React.useState("");
    const [plantId, setPlantId] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [imagePath, setImagePath] = React.useState("");
    const [image, setImage] = React.useState<File>();

    const handleClose = () => {
        props.setOpenDialog();
    };

    const userPlants = async () => {
        if (auth.user) {
            const plants = await getUserPlants(auth.user.username);
            const plant = plants.find(plant => plant.name === plantName);
            if (plant !== undefined)
                setPlantId(plant?.id);
        }
    }

    const handleNewIssue = async () => {
        handleClose();
        await userPlants();
        const data: NewIssueData = {
            title: title,
            description: description,
            username: auth.user!.username,
            plantid: plantId
        }
        const issue = await addNewIssue(data);
    }

    const imageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null)
            setImage(event.target.files[0]);
    }

    return (
        <div>
            <Dialog open={props.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Please enter the Issue
                  </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="plantname"
                        label="Plant name"
                        type="text"
                        fullWidth
                        required
                        onChange={(e) => setPlantName(e.target.value)}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows="4"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {/* <Button variant="contained" color="primary" component="label" className={classes.uploadbutton}>
                        Upload file
                        <input type="file" accept="image/*" hidden 
                            onChange={(e) => imageSelected(e)}
                        />
                    </Button> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                  </Button>
                    <Button onClick={handleNewIssue} color="primary">
                        Add
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};