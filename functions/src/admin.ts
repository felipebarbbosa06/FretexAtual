const admin = require('firebase-admin');
import config from './config';
const serviceAccount = require(config.adminSDKFile);

admin.initializeApp({
    databaseURL: config.databaseURL,
    credential: admin.credential.cert(serviceAccount)
});

export default admin;