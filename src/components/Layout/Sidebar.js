import { useEffect, useState } from "react";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@mui/material/MenuItem";
// import nae from "../../../../sqltester-backend/saves/";
import { withStyles } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import DownloadDatabase from "../Database/Download";
import UploadDatabase from "../Database/Upload";
import { listDatabases } from "../SavedDatabase/API";
import Schema from "../Schema";
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

  // const handleUpload = async (event) => {
  //   let defaultDatabase = event.target.value;
  //   // defaultDatabase = nae + defaultDatabase;
  //   let typedArray;

  //   await fetch(defaultDatabase)
  //     .then((res) => res.arrayBuffer())
  //     .then((arrayBuffer) => {
  //       typedArray = new Uint8Array(arrayBuffer);
  //     });
  //   console.log(typedArray);
  //   // window.location.reload();
  // };
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
            List of Databases{" "}
          </h4>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ position: "relative", top: "5%" }}
            // value={age}
            label="Age"
            // onChange={handleUpload}
          >
            <MenuItem>List Of Database</MenuItem>
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
