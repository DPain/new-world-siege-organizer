import * as admin from 'firebase-admin';

const App = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://new-world-siege-organizer-default-rtdb.firebaseio.com',
});

export { App };
