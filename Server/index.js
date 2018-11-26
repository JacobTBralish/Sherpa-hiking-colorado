require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
const vC = require('./visited-controller/visited-controller');
const sflC = require('./save-for-later-controller/save-for-later-controller');
const uC = require('./user-controller/user-controller');
const rC = require('./trail-review-controller/trail-review-controller');
const cloudinary = require('cloudinary');


app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))
app.use( express.static( `${__dirname}/../build` ) );


massive(process.env.CONNECTION_STRING).then(database => {
    console.log('Hooked up to your database bruhh.🤙')
    app.set('db', database);
}).catch(error => { console.log(error)});

//-------------------------------------------------------------------------------------Auth0----------------------------------------------------------------------\\

app.get('/auth/callback', (req,res) => {
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type:'authorization_code',
            redirect_uri: `https://${req.headers.host}/auth/callback`
        }
  function tradeCodeForAccessToken(){console.log('traded code for access token')
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
  }
   function tradeAccessTokenForUserInfo(accessTokenResponse){
       const accessToken = accessTokenResponse.data.access_token;
       return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`);
   }
  function storeUserInfoInDatabase(response){console.log('Stored user info in db')
      const auth0Id = response.data.sub;
      const db = req.app.get('db');
      return db.find_user_by_auth0_id(auth0Id).then(users => {
          if (users.length){console.log(users)
            const user = users[0];
            req.session.user = user;
            res.redirect('/');
        } else {
            const userArray = [
                  auth0Id,
                  response.data.picture,
                  response.data.given_name,
                  response.data.family_name,
                  response.data.name,
                  response.data.email,
              ];
              return db.create_user(userArray).then(newUser => {
                req.session.user = newUser[0]
                  res.redirect('/');
              }).catch(error => {
                  console.log('Error in db.create_user', error)
                  res.status(500).json('Unexpected error')
              })
          }
      }).catch(error => {
          console.log('Error in find_user', error)
          res.status(500).json('Unexpected error')
      })
   }
  tradeCodeForAccessToken()
  .then(tradeAccessTokenForUserInfo)
  .then(storeUserInfoInDatabase)
  .catch(error => {
    console.log('Error in auth/callback', error)
    res.status(500).json('Unexpected error')
  })
});

app.get('/', (req, res) => {
res.send('endpoint live')
});

//------------------------------------------------------------------------------Cloudinary------------------------------------------------------------------\\

app.get('/api/upload', (req, res) => {
    // get a timestamp in seconds which is UNIX format
        const timestamp = Math.round((new Date()).getTime() / 1000);
    // cloudinary API secret stored in the .env file
        const api_secret  = process.env.CLOUDINARY_SECRET_API;
    // user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
    // make a signature object to send to your react app
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
            res.json(payload);
    })

// ================================================ Trail ====================================== \\
app.get('/api/getpostedimages/:id', rC.getTrailsPostedPictures);

// ================================================ Reviews ====================================== \\
app.get('/api/trailreview/:id', rC.getTrailReviewById);
app.post('/api/trailreview/:id', rC.postReview);
app.put('/api/trailreview/:id', rC.editReview);
app.delete('/api/trailreview/:id', rC.deleteReview);

// ================================================ Visted ====================================== \\
app.get('/api/visited/:id', vC.getVisitedTrails);
app.post('/api/visited/:id', vC.markAsVisited);
app.delete('/api/visited/:id', vC.deleteVisitedTrail);

// ================================================ Saved ====================================== \\
app.get('/api/saveforlater/:id', sflC.getSavedTrails);
app.post('/api/saveforlater/:id', sflC.saveForLater);
app.delete('/api/saveforlater/:id', sflC.deleteSavedTrail);


// ================================================ Auth0 Login ====================================== \\

app.get('/api/user-data', (req, res) => {
    res.json(req.session.user);
});
// ================================================= Auth0 Logout ===================================== \\

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json();
})

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


const PORT = 4000;
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}🏄`));