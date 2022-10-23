import React , { useState, useEffect } from "react";

import SnackBar from "@material-ui/core/Snackbar";
import SnackBarContent from "@material-ui/core/SnackbarContent";

import Button from "@material-ui/core/Button";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import WarningIcon from "@mui/icons-material/Warning";
import { withStyles } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

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

function Feedback ({timestamp,message,variant,classes}) {
  const [Message, setMessage] = useState(null);
  const [Variant, setVariant] = useState(null);
  const [timeStamp, setTimestamp] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect((prevProps)=>{   if (
    !timestamp ||
    (typeof timestamp !== "undefined" &&
      timestamp === prevProps.timestamp)
  ) {
    return;
  }
     queue.push({
      message: message,
      variant: variant,
      timestamp: timestamp,
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      return setOpen(false)
    } else {
      return processQueue();
    }
   }, [])


 const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false)
  };

  const processQueue = () => {
    if (queue.length > 0) {
      const { message, variant, timestamp } = queue.shift();
      setMessage(message)
      setVariant(variant)
      setTimestamp(timestamp)
      setOpen(true)
    }
  };

  const handleExited = () => processQueue();

  
  // Return nothing if no message is set yet.
    if (!message) return null;

    const Icon = variantIcon[variant];

    return (
      <SnackBar
        key={timestamp}
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
