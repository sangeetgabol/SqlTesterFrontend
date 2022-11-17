import React, { useState, useEffect } from "react";

import SnackBar from "@mui/material/Snackbar";
import SnackBarContent from "@mui/material/SnackbarContent";

import Button from "@mui/material/Button";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import WarningIcon from "@mui/icons-material/Warning";
import { withStyles } from "@material-ui/core/styles";

import green from "@mui/material/colors/green";
import amber from "@mui/material/colors/amber";

import classNames from "classnames";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const style = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

let queue = [];

function Feedback(props) {
  console.log(props);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [open, setOpen] = useState(null);
  // state = {
  //   message: null,
  //   variant: null,
  //   timestamp: null,
  //   open: false,
  // };

  // componentDidUpdate(prevProps) {
  //   // Skip if no feedback object is passed OR is the same as the previous object.
  //   if (
  //     !this.props.timestamp ||
  //     (typeof prevProps.timestamp !== "undefined" &&
  //       this.props.timestamp === prevProps.timestamp)
  //   ) {
  //     return;
  //   }

  //   // If a new feedback object is passed, and isn't the same as the previous object injected
  //   this.queue.push({
  //     message: this.props.message,
  //     variant: this.props.variant,
  //     timestamp: this.props.timestamp,
  //   });

  //   if (this.state.open) {
  //     // immediately begin dismissing current message
  //     // to start showing new one
  //     return this.setState({ open: false });
  //   } else {
  //     return this.processQueue();
  //   }
  // }
  useEffect(() => {
    // Skip if no feedback object is passed OR is the same as the previous object.
    // if (
    //   !props.timestamp ||
    //   (typeof prevProps.timestamp !== "undefined" &&
    //     props.timestamp === prevProps.timestamp)
    // ) {
    //   return;
    // }
    // a++;
    // If a new feedback object is passed, and isn't the same as the previous object injected

    // if (open) {
    // immediately begin dismissing current message
    // to start showing new one
    // return setOpen(false);
    // } else {
    return processQueue();
    // }
  }, [props]);
  console.log("s", queue);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const processQueue = () => {
    if (props != null) {
      queue.push({
        message: props.feedback?.message,
        variant: props.feedback?.variant,
        timestamp: props.feedback?.timestamp,
      });
    }
    if (queue.length > 0) {
      const { message, variant } = queue.shift();

      // this.setState({
      //   message,
      //   variant,
      //   timestamp,
      //   open: true,
      // });
      setOpen(true);
      setMessage(message);
      setVariant(variant);
      setTimestamp(timestamp);
    }
  };

  const handleExited = () => processQueue();

  // render() {
  const { classes } = props;

  // Return nothing if no message is set yet.
  if (!message) return null;

  const Icon = variantIcon[variant];

  return (
    <SnackBar
      key={props.timestamp}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      onExited={handleExited}
    >
      <SnackBarContent
        className={classes[variant]}
        aria-describedby="feedback-message"
        message={
          <span id="feedback-message" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={
          <Button
            key="close"
            aria-label="Dismiss"
            size="small"
            onClick={handleClose}
          >
            Dismiss
          </Button>
        }
      />
    </SnackBar>
  );
}

export default withStyles(style)(Feedback);
