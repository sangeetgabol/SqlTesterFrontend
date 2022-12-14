import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

import { saveDatabase } from "./API";

import { Link } from "react-router-dom";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

export default function SaveDatabase(props) {

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const handleSaveDatabase = async () => {

    const { refreshSavedDatabaseList, currentDatabase } = props;

    // Export the current database into a array buffer.
    const database = currentDatabase.export();
    // Try to save the database on the server.
    console.log(database);
    try {
      await saveDatabase(title, database);

      // Refresh the database list so the newly deleted databases goes.
      // This could be replaced with a client-side removal of the node, if you're a stickler for optimization.
      refreshSavedDatabaseList();
      window.location.reload();
      // Redirect back to the database list.
    } catch (response) {
      const error = await response;

      setError(error);
    }
  };

  const handleChange = (e) => setTitle(e.target.value);

  const handleClose = () => props.closeHandler();

  const { currentSavedDatabaseCount } = props;

  return (
    <React.Fragment>
      <DialogTitle id="dialog-title" style={flexSpaceBetween} disableTypography>
        <Typography variant="h6">Save your current database</Typography>
        <Button
          component={Link}
          color="secondary"
          variant="contained"
          size="small"
          to="/"
        >
          &laquo; Back
        </Button>
      </DialogTitle>
      <DialogContent>
        <FormControl
          error={Boolean(error)}
          aria-describedby="name-error-text"
          fullWidth
        >
          <Input
            id="name"
            placeholder="Please choose an identifiable title"
            value={title}
            onChange={handleChange}
            margin="dense"
            autoFocus
            fullWidth
            required
            inputProps={{ maxLength: 32 }}
          />
          {error && (
            <FormHelperText id="name-error-text">{error}</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveDatabase}
          disabled={Boolean(
            currentSavedDatabaseCount && currentSavedDatabaseCount > 4
          )}
        >
          Save ({currentSavedDatabaseCount}
          /5)
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
