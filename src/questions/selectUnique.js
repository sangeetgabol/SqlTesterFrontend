import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const selectUnique = {
  set: "Easy",
  build: (db, myTable) => {
    const tables = getTables(db, myTable, 1);

    const [{ table, column }] = getColumns(db, tables);

    return {
      question: `Display all the unique **${column}**'s that exist in **${table}**`,
      answer: `SELECT DISTINCT ${column} FROM ${table}`,
    };
  },
};

export default selectUnique;
