import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";

import SchemaItem from "./Item";

function Schema(props) {
  // state = {
  //   schema: null,
  // };
  const [schema, setSchema] = useState(null);
  useEffect(() => {
    load();
  }, []);
  // componentDidMount() {
  //   this.load();
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // Update if the current schema is empty, or theres a new schema coming in.
  //   return (
  //     this.state.schema === null ||
  //     (nextState.schema !== null && this.state.schema !== nextState.schema)
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   const hasDatabaseChanged =
  //     this.props.currentDatabase.lastModified !==
  //     prevProps.currentDatabase.lastModified;

  //   if (hasDatabaseChanged) {
  //     this.load();
  //   }
  // }

  const load = () => {
    const sql = 'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table"';

    // Destructure the response to get only the values (the real schema data).
    let [{ values: tableNames }] = props.currentDatabase.exec(sql);

    // tableNames are returned as [[0] => "Tbl_name", [1] => "Tbl_name"]]
    const schema = tableNames.map(([tableName]) => {
      // Extra the row count from each table.
      // Expensive operation!
      const [
        {
          values: [[count]],
        },
      ] = props.currentDatabase.exec(`SELECT COUNT(*) FROM ${tableName}`);

      return {
        name: tableName,
        count,
      };
    });
    setSchema(schema);
    // this.setState({ schema });
  };

  // render() {
  // const { schema } = this.state;

  if (!schema) {
    return <div>Loading...</div>;
  }

  const { showSchemaHandler } = props;

  return (
    <React.Fragment>
      <Typography
        component="h3"
        variant="body1"
        color="textSecondary"
        align="center"
        gutterBottom
      >
        Database Schema
      </Typography>
      <List dense>
        {schema.map(({ name, count }) => (
          <SchemaItem
            key={name}
            name={name}
            count={count}
            showSchemaHandler={showSchemaHandler}
          />
        ))}
      </List>
    </React.Fragment>
  );
}

export default Schema;
