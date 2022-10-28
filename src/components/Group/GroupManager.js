import React from "react";

import Dialog from "@material-ui/core/Dialog";

import { Route } from "react-router-dom";

import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";
import ManageGroup from "./Manage";

import { BrowserRouter as Router } from "react-router-dom";

export default function GroupManager (props) {
 const handleClose = () => props.closeHandler();

  // render() {
    const {
      currentGroup,
      loadDatabaseHandler,
      joinGroupHandler,
      leaveGroupHandler,
    } = props;

    const ManageGroupComponent = ({ match }) => (
      <Dialog onClose={handleClose} open fullScreen>
        <ManageGroup match={match} closeHandler={handleClose} />
      </Dialog>
    );

    const CreateGroupComponent = () => (
      <Dialog onClose={handleClose} open fullWidth>
        <CreateGroup closeHandler={handleClose} />
      </Dialog>
    );

    const GroupListComponent = () => (
      <Dialog onClose={handleClose} open fullWidth>
        <GroupList
          currentGroup={currentGroup}
          joinGroupHandler={joinGroupHandler}
          leaveGroupHandler={leaveGroupHandler}
          loadDatabaseHandler={loadDatabaseHandler}
          closeHandler={handleClose}
        />
      </Dialog>
    );

    // Why do some routes use `component` prop and some the `render` prop?
    // https://stackoverflow.com/a/48152635
    return (
      <Router>
        {/* <Switch> */}
        <Route
          path="/group/manage/:id/:title"
          component={ManageGroupComponent}
        />

        <Route path="/group/create" render={CreateGroupComponent} />

        <Route render={GroupListComponent} />
        {/* </Switch> */}
      </Router>
    );
  }
//}
