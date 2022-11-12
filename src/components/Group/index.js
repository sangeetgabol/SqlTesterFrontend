import React, { Suspense, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
const LoadableGroupManager = React.lazy(() =>
  import("./GroupManager" /* webpackChunkName: "groups" */)
);

export default function Group(props) {
  // state = {
  //   open: false,
  // };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  // render() {
  //   const { open } = this.state;

  const {
    currentGroup,
    joinGroupHandler,
    leaveGroupHandler,
    loadDatabaseHandler,
  } = props;

  return (
    <React.Fragment>
      <Tooltip title="Groups">
        <IconButton
          color={currentGroup ? "secondary" : "inherit"}
          aria-label="Group List"
          onClick={handleOpen}
          // onMouseOver={this.handleMouseOver}
        >
          <GroupIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {open && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadableGroupManager
            closeHandler={handleClose}
            handleOpen={handleOpen}
            currentGroup={currentGroup}
            loadDatabaseHandler={loadDatabaseHandler}
            joinGroupHandler={joinGroupHandler}
            leaveGroupHandler={leaveGroupHandler}
          />
        </Suspense>
      )}
    </React.Fragment>
  );
}
