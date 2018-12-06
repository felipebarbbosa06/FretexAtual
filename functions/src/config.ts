const SDKFile = "fretex-ee59b-firebase-adminsdk-jm3ib-ae3de6dddd.json";

export default {
    databaseURL: "https://fretex-ee59b.firebaseapp.com",
    gcsBucket: "fretex-ee59b.appspot.com",
    authHeader: "authorization",
    gcsSDKFile: "./" + SDKFile,
    adminSDKFile: "../" + SDKFile,
    limit: 5,
    limitPopulateTable: 5
};
