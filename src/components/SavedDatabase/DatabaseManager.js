import React, { useEffect, useState } from "react";

import { listDatabases } from "./API";

import Dialog from "@mui/material/Dialog";

import DatabaseList from "./DatabaseList";
import SaveDatabase from "./SaveDatabase";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function DatabaseManager(props) {
  // state = {
  //   list: null,
  // };
  const [list, setList] = useState([]);
  // componentDidMount = () => this.refreshSavedDatabaseList();
  useEffect(() => {
    refreshSavedDatabaseList();
  }, []);
  const refreshSavedDatabaseList = () => {
    listDatabases().then((list) => setList(list));
    // window.location.reload();
  };

  const handleClose = () => props.closeHandler();

  // render() {
  // const { list } = this.state;

  if (list === null) {
    return null;
  }

  const { currentDatabase, loadDatabaseHandler } = props;

  const SaveDatabaseComponent = ({ history }) => (
    <SaveDatabase
      history={history}
      currentDatabase={currentDatabase}
      currentSavedDatabaseCount={list.length}
      refreshSavedDatabaseList={refreshSavedDatabaseList}
      closeHandler={handleClose}
    />
  );

  const DatabaseListComponent = () => (
    <DatabaseList
      list={list}
      loadDatabaseHandler={loadDatabaseHandler}
      refreshSavedDatabaseList={refreshSavedDatabaseList}
      closeHandler={handleClose}
    />
  );

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      {/* <DatabaseListComponent /> */}
      <Routes>
        <Route path="/database/save" element={<SaveDatabaseComponent />} />
        <Route path="/" element={<DatabaseListComponent />} />
      </Routes>
    </Dialog>
  );
}
