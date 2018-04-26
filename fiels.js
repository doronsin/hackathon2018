// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
const 
// Creates a client
const storage = new Storage();


const bucketName = 'my-bucket';
// const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

// Uploads a local file to the bucket
storage
  .bucket(bucketName)
  .upload(filename)
  .then(() => {
    console.log(`${filename} uploaded to ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });