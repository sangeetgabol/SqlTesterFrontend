import getTables from "./utils/getTables";

const top = {
  set: "Hard",

  build: (db) => {
    let [table] = getTables(db, 1);

    return {
      question: `Display first three **${table}**`,
      answer: `SELECT top 3 * FROM ${table}`,
    };
  },
};

export default top;
