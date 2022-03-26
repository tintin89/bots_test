import admin from "firebase-admin";

const serviceAccount = require("D:/kiwi/generatedKeyFromServiceAccountFirebase.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
module.exports = { admin, db };