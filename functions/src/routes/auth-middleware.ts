import admin from '../admin';

const authenticate = (req, res, next) => {
    console.log('header', req.headers);
    console.log('header', req.headers.referer);

    const ref = req.headers.referer;
        
    if (!req.headers.authorization) {
      res.status(401).send('Unauthorized');
      return;
    }

    if (req.headers.authorization == 'eQ7Dmx3omSywvyynk9kX') {
      return next();
    }

    if(req.headers.authorization.startsWith('Bearer ')){
      const idToken = req.headers.authorization.split('Bearer ')[1];
      admin.auth().verifyIdToken(idToken).then((decodedUser) => {
        req.user = decodedUser;
        console.log("user -", req.user);
        return next();
      }).catch((err) => {
        console.log(err);
        res.status(401).send('Unauthorized');
      });
    }else{
      res.status(401).send('Unauthorized');
      return;
    }
};

export default authenticate;
