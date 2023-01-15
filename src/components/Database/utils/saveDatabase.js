import toBinString from "./toBinString";

const saveDatabase = (database) => {
  console.log(database.export());
  localStorage.setItem("__testSQL_Database__", toBinString(database.export()));
};

export default saveDatabase;
