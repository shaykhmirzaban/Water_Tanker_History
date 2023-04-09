import app from "./firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onValue,
  update,
} from "firebase/database";

const database = getDatabase(app);

function addItem(obj, pathName) {
  return new Promise((resolve, reject) => {
    obj.key = push(ref(database, pathName)).key;
    let reference = ref(database, `${pathName}/${obj.key}`);

    set(reference, obj)
      .then(() => {
        resolve("Data is successfully Store");
      })
      .catch(() => {
        reject("something was wrong");
      });
  });
}

function removeItem(id) {
  return new Promise((resolve, reject) => {
    let reference;
    if (id) {
      reference = ref(database, `currentHistory/${id}`);
    } else {
      reference = ref(database, `currentHistory`);
    }
    remove(reference)
      .then(() => {
        resolve("Successfully remove your data");
      })
      .catch(() => {
        reject("Something was wrong");
      });
  });
}

function getData(pathName) {
  return new Promise((resolve, reject) => {
    let reference = ref(database, pathName);
    onValue(reference, (snapshort) => {
      if (snapshort.exists) {
        resolve(snapshort.val());
      } else {
        reject("Something was wrong");
      }
    });
  });
}

function updateItem(obj, id) {
  return new Promise((resolve, reject) => {
    let reference = ref(database, `currentHistory/${id}`);
    update(reference, obj)
      .then(() => {
        resolve("Successfully Update Item");
      })
      .catch(() => {
        reject("Something was wrong");
      });
  });
}

export { addItem, removeItem, getData, updateItem };
