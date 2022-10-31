import getTables from "./utils/getTables";

const selectAll = {
  set: "Easy",

  build: (db, myTable) => {
    let [table] = getTables(db, myTable, 1);

    return {
      question: `Display all **${table}**`,
      answer: `SELECT * FROM ${table}`,
    };
  },
};

export default selectAll;
