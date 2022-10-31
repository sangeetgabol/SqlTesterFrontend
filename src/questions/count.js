import getTables from "./utils/getTables";

const count = {
  set: "Intermediate",
  build: (db, myTable) => {
    const table = getTables(db, myTable, 1);

    return {
      question: `How many **${table}** are there?`,
      answer: `SELECT COUNT(*) FROM ${table}`,
    };
  },
};

export default count;
