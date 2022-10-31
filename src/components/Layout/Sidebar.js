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
  const handleUpload = async (event) => {
    const data = event.target.value;
    console.log(data);
    const SQL = await initSqlJs({
      locateFile: () => file,
    });
    console.log(SQL);
    // Create a new SQL object
    const database = new SQL.Database(data);

    database.lastModified = Date.now();

    // Save the database in the cache, for persistence without reliance of the server.
    uploadDatabaseHandler(database);
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
          <h4 style={{ position: "relative", top: "48%", padding: "1rem" }}>
            Choose Database{" "}
          </h4>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ position: "relative", top: "45%" }}
            // value={age}
            label="Age"
            onChange={handleUpload}
          >
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
