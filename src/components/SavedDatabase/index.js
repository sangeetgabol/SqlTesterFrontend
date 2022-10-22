import React, { Suspense } from "react";

import IconButton from "@material-ui/core/IconButton";
import StorageIcon from "@mui/icons-material/Storage";

import Tooltip from "@material-ui/core/Tooltip";

const LoadableDatabaseManager = React.lazy(() =>
  import("./DatabaseManager" /* webpackChunkName: "saved-databases" */)
);

export default class SavedDatabase extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    const { currentDatabase, loadDatabaseHandler, disabled } = this.props;

    if (disabled) {
      return (
        <Tooltip title="Disabled while in a group">
          <span style={{ display: "inline-block" }}>
            {/* <IconButton
              color="inherit"
              aria-label="Saved Database Actions"
              disabled
            > */}
            <StorageIcon fontSize="small" />
            {/* </IconButton> */}
          </span>
        </Tooltip>
      );
    }

    return (
      <React.Fragment>
        <Tooltip title="Saved Databases">
          <span style={{ display: "inline-block" }}>
            <IconButton
              onClick={this.handleOpen}
              onMouseOver={this.handleMouseOver}
              color="inherit"
              aria-label="Saved Database Actions"
            >
              <StorageIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        {open && (
          <Suspense fallback={<div>Loading...</div>}>
            <LoadableDatabaseManager
              closeHandler={this.handleClose}
              currentDatabase={currentDatabase}
              loadDatabaseHandler={loadDatabaseHandler}
            />
          </Suspense>
        )}
      </React.Fragment>
    );
  }
}
