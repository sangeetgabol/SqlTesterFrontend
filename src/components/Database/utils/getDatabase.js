import toBinArray from "./toBinArray";

import defaultDatabase from "./default.sqlite";

const getDatabase = (data) =>
  new Promise(async (resolve, reject) => {
    const cachedDatabase = localStorage.getItem("__testSQL_Database__");
    // console.log(defaultDatabase);
    let typedArray;

    if (cachedDatabase && data === "") {
      typedArray = toBinArray(cachedDatabase);
    } else if (data !== "") {
      console.log("1", data);

      await fetch(data + ".sqlite")
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => {
          typedArray = new Uint8Array(arrayBuffer);
        });
    } else {
      // No cached database, load the default database.
      await fetch(defaultDatabase)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => {
          typedArray = new Uint8Array(arrayBuffer);
        });
    }

    return resolve(typedArray);
  });

export default getDatabase;
