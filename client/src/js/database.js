import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
       const store = db.createObjectStore('jate', { keyPath: 'id'});
        store.put({ id: 1, value: "Welcome to Jate!" });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
// console.error('putDb not implemented');

const textDb = await openDB('jate', 1);

const tx = textDb.transaction('jate', 'readwrite');

const store = tx.objectStore('jate');

const request = store.put({ id: 1, value: content});

const result = await request;

console.log('Data saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
// console.error('getDb not implemented');

const textDb = await openDB('jate', 1);

const tx = textDb.transaction('jate', 'readonly');

const store = tx.objectStore('jate');

const request = await store.get(1);
return request.value
};

initdb();
