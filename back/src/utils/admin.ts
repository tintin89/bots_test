import admin from "firebase-admin";

const serviceAccount = require("D:/kiwi/bots-46517-firebase-adminsdk-1317n-4507b459c6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
module.exports = { admin, db };