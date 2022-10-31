import React, { useState } from "react";

import Main from "./Main";
import Sidebar from "./Sidebar";
import buildQuestions from "../../questions/utils/buildQuestions";
import UserContext from "../Auth/Context";
import saveQuestions from "../../questions/utils/saveQuestions";
const containerStyle = {
  display: "flex",
  flexDirection: "row",
  zIndex: 0, // The header shadow will overlap.
  height: "100%",
};

export default function Container({
  currentDatabase,
  sidebarToggleHandler,
  loadDatabase,
  openSidebar,
}) {
  // state = {
  //   results: []
  // };
  const [results, setResult] = useState([]);
  const handleUpdateResults = (results) => {
    // this.setState({ results });
    setResult(results);
  };

  const displaySchema = async (name) => {
    // const { currentDatabase } = this.props;
    console.log(name);
    localStorage.removeItem("__testSQL_Questions__");
    localStorage.setItem("name", name);
    const allQuestions = await buildQuestions(currentDatabase);
    saveQuestions(allQuestions);
    window.location.reload();
    const results = currentDatabase.exec(`SELECT * FROM ${name} LIMIT 10`);
    console.log(results);
    handleUpdateResults(results);

    return sidebarToggleHandler();
  };

  // render() {
  // const {
  //   currentDatabase,s
  //   loadDatabase,
  //   openSidebar,
  //   sidebarToggleHandler
  // } = this.props;

  // const { results } = this.state;

  return (
    <div style={containerStyle}>
      <Sidebar
        open={openSidebar}
        currentDatabase={currentDatabase}
        uploadDatabaseHandler={loadDatabase}
        showSchemaHandler={displaySchema}
        toggleSidebarHandler={sidebarToggleHandler}
      />
      <UserContext.Consumer>
        {({ isLoaded, user }) =>
          isLoaded && (
            <Main
              user={user}
              results={results}
              updateResultsHandler={handleUpdateResults}
              currentDatabase={currentDatabase}
              loadDatabase={loadDatabase}
            />
          )
        }
      </UserContext.Consumer>
    </div>
  );
}
