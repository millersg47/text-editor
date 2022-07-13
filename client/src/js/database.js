import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("PUT to the jateDb");

  //create connection to the database and version we want to use
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .put() method to update the jate content in the database.
  const request = store.put({ jate: content });

  // Get confirmation of the request.
  const result = await request;

  //check if request was confirmed
  if (result) {
    console.log("result.value", result);
  } else {
    console.error("putDb not implemented");
  }
};

export const getDb = async () => {
  console.log("GET from jateDb");

  // Create a connection to the database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;

  //check if request was confirmed
  if (result) {
    console.log("result.value", result);
  } else {
    console.error("getDb not implemented");
  }
};
initdb();
