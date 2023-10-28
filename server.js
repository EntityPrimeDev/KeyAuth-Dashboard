const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { ClientApi } = require("@keyauthjs/client");
const { serialize } = require('v8');
const discord = require("./start")
const { DebugString } = require("./Source/Functions/Debug");
const uuid = require('uuid');
const HCrypt = require("./encrypt");

// Not Needed AnyMore
//const clientApi = new ClientApi({ name: "", ownerid: "" ver:"1.0"})


var encrypt_v5 = [];

for(var i = 0; i > encrypt_v5 ; i++) {
  encrypt_v5.push(HCrypt.encrypt_v5(uuid.v4()))
}

const KeyAuth = require('./KeyAuth');


const KeyAuthApp = new KeyAuth(
  "", // Application Name
  "", // OwnerID
  "", // Application Secret
  "1.0" // Application Version
);

async function loadKeyAuth() {
  await KeyAuthApp.Initialize();
}
loadKeyAuth()

// clientApi.on('error', async (data) => {
//   console.log("Keyauth CLient Error: ", data)
// });

// mongoose.connect('', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
//   }).catch((error) => {
//     console.error('MongoDB Connection Error:', error);
// });

  
let USERSCHEMA = new mongoose.Schema({
    password: String,
    username: String,
    email: String,
});

let User = mongoose.model('User', USERSCHEMA);


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: 'GSGGSFSVSBDSRWRTW#453242sFGSGSFGG', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Public', 'Images')));
app.use(express.static(path.join(__dirname, 'Public', 'LoggedIn')));
app.use(express.static(path.join(__dirname, 'Public', 'LoggedIn', 'Images')));
app.use(express.static(path.join(__dirname, 'KeyAuth.js')));

function requireLogin(req, res, next) {
  if (!req.cookies.userId) {
    return res.redirect('/');
  }
  next();
}



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/dashboard", requireLogin, async (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'LoggedIn', 'Dash.html'));
})

app.get("/dashboard" + "/generate", requireLogin, async (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'LoggedIn', 'gen.html'));
})

app.get("/store", async (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'store.html'));
})

 
app.get('/logout', requireLogin, async (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});


app.post('/login', async (req, res) => {
  // const init = await clientApi.init();
  // if (!init.success) {
  //   console.log("Init Error: ", init);
  //   //res.send("Error Logging In | Internal Server Error");
  //   return
  // }

  const { username, password } = req.body;

  // const login = await clientApi.login({ username, password, sessionId: init.sessionid });


  await KeyAuthApp.login(username, password);

  if (KeyAuthApp.response.success) {
    const userId = uuid.v4();

    res.cookie('userId', userId, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.redirect('/dashboard');
  } else {
    res.redirect('/');
    //res.send("Login Failed | Internal Server Error");
  }
});

app.post('/register', async (req, res) => {
  // console.log('Register end point call from website')
  // const init = await clientApi.init();
  // if (!init.success) {
  //   console.log("Init Error: ", init);
  //   //res.send("Error Registering In | Internal Server Error");
  //   return
  // }
  const { newUsername, newPassword, email, newKey} = req.body;

  //const register = await clientApi.register({ username: newUsername, password: newPassword, key: newKey, sessionId: init.sessionid, email });

  await KeyAuthApp.register(newUsername, newPassword, newKey, email);
  if (KeyAuthApp.response.success) {
      res.redirect('/');
     // console.log("Good")
  } else {
      //console.log("Bad")
   // res.send("Error Registering In | Internal Server Error");
      res.redirect('/');
  } 
});
 

app.listen(3000, () => {
  discord.Main_DiscordFunc();
  DebugString('Server is running on port 3000', "green");
});