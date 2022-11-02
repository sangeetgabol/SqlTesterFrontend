import React, { useState, useEffect } from "react";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@mui/material/MenuItem";

import initSqlJs from "sql.js";
import file from "../../sql-wasm.wasm";
import Select from "@mui/material/Select";
import Schema from "../Schema";
import UploadDatabase from "../Database/Upload";
import DownloadDatabase from "../Database/Download";
import getDatabase from "../Database/utils/getDatabase";
import { withStyles } from "@material-ui/core/styles";
import { listDatabases } from "../SavedDatabase/API";
const styles = (theme) => ({
  drawerDocked: {
    height: "100%",
  },
  drawerPaper: {
    width: "16rem",
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  gutterTop: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
  },
  drawerBottomActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "8px",
  },
  // Necessary for content to be below app bar.
  toolbar: theme.mixins.toolbar,
});

function Sidebar({
  classes,
  open,
  showSchemaHandler,
  uploadDatabaseHandler,
  currentDatabase,
  toggleSidebarHandler,
}) {
  const handleToggleSidebar = () => toggleSidebarHandler(false);
  const [list, setList] = useState([]);
  // render() {
  // const {
  //   classes,
  //   open,
  //   showSchemaHandler,
  //   uploadDatabaseHandler,
  //   currentDatabase,
  //   toggleSidebarHandler,
  // } = props;

  const schema = (
    <Schema
      currentDatabase={currentDatabase}
      showSchemaHandler={showSchemaHandler}
      toggleSidebarHandler={toggleSidebarHandler}
    />
  );

  const schemaActions = (
    <div className={classes.drawerBottomActions}>
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandler} />
      <DownloadDatabase currentDatabase={currentDatabase} />
    </div>
  );
  let typedArray;
  const handleUpload = async (event) => {
    let defaultDatabase = event.target.value;

    console.log(defaultDatabase);
    // defaultDatabase = defaultDatabase;
    console.log(defaultDatabase);
    const database = await getDatabase(defaultDatabase);
    console.log(database);
    uploadDatabaseHandler(database);
    // window.location.reload();
  };
  useEffect(() => {
    listDatabases().then((list) => setList(list));
  }, []);
  console.log(list);
  return (
    <div className={classes.container}>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={open}
          onClose={handleToggleSidebar}
          classes={{
            docked: classes.drawerDocked,
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.gutterTop}>{schema}</div>
          {schemaActions}
        </Drawer>
      </Hidden>
      <Hidden implementation="css" smDown>
        <Drawer
          classes={{
            docked: classes.drawerDocked,
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <div className={classes.gutterTop}>{schema}</div>
          <h4 style={{ position: "relative", top: "8%", padding: "1rem" }}>
            Choose Database{" "}
          </h4>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ position: "relative", top: "5%" }}
            // value={age}
            label="Age"
            onChange={handleUpload}
          >
            <MenuItem>Choose Database</MenuItem>
            {list?.map((item) => (
              <MenuItem value={item.path}>{item.title}</MenuItem>
            ))}
          </Select>

          {schemaActions}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default withStyles(styles)(Sidebar);
