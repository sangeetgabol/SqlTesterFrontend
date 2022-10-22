import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { login } from "./API";

function Guest({ loginHandler }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    // const { username, password } = this.state;

    try {
      const user = await login(username, password);

      return loginHandler(user);
    } catch (response) {
      const error = await response.text();
      setError(error);
      // this.setState({ error });
    }
  };

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassowrd = (event) => setPassword(event.target.value);
  // this.setState({ [event.target.id]: event.target.value });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>

        {error && (
          <DialogContent>
            <DialogContentText color="error" align="center">
              {error}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogContent>
          <TextField
            type="text"
            id="username"
            label="Username"
            onChange={handleChangeUsername}
            margin="dense"
            autoFocus
            fullWidth
            required
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            onChange={handleChangePassowrd}
            margin="dense"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Guest;
