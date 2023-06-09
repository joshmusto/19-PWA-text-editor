import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Saving content to database...');

  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ content });

  const result = await request;
  if (result) {
    console.log('Content saved to database', result);
  }
  else console.error('Content not saved to database - No result from request');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database...');

  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  if (!result) {
    console.error('Content not retrieved - No result from request');
    return;
  }
  else console.log('Content retrieved from database', result)
  return result[result.length-1].content;
};

initdb();
