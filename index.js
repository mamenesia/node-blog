require('dotenv').config();

const expressEdge     = require('express-edge'),
      express         = require('express'),
      mongoose        = require('mongoose'),
      bodyParser      = require('body-parser'),
      fileUpload      = require('express-fileupload'),
      expressSession  = require('express-session'),
      connectMongo    = require('connect-mongo'),
      connectFlash    = require('connect-flash'),
      edge            = require('edge.js'),
      cloudinary      = require('cloudinary');

const app     = new express();
mongoose.connect(process.env.DB_URI);
app.use(connectFlash());
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(expressSession);
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_KEY,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))

// Controllers
const createPostController  = require('./controllers/createPost'),
      homePageController    = require('./controllers/homePage'),
      storePostController   = require('./controllers/storePost'),
      getPostController     = require('./controllers/getPost'),
      createUserController  = require('./controllers/createUser'),
      storeUserController   = require('./controllers/storeUser'),
      loginController       = require('./controllers/login'),
      loginUserController   = require('./controllers/loginUser'),
      logoutController      = require('./controllers/logout');



app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId)

  next();
})

// Custom Middleware
const storePost = require('./middleware/storePost'),
      auth      = require('./middleware/auth'),
      redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

// 
// CRUD 
app.get('/', homePageController);
app.get('/post/new', auth, createPostController);
app.post('/post/store', auth, storePost, storePostController);
app.get('/auth/logout',auth, logoutController);
app.get('/post/:id', getPostController);
app.get('/auth/register', redirectIfAuthenticated, createUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.use((req,res) => res.render('not-found'));


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});