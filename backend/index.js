const express = require('express')
const cors = require('cors')
const path = require('path')
var jwt = require('jsonwebtoken');
const productController=require('./controllers/productController');
const userController=require('./controllers/userController');

const multer = require('multer')
const http=require('http');
const {Server}=require("socket.io");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
const bodyParser = require('body-parser')

const app = express() //accept restapi
const httpServer=http.createServer(app);

const io=new Server(httpServer,{
  cors:{
    origin:'*'
  }
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://adyakumari:22352002@cluster0.fup7ty1.mongodb.net/sparebazar');


const mongoose = require("mongoose");
const { Socket } = require('dgram');
mongoose.connect("mongodb://127.0.0.1:27017/sparebazar").then(() => {
  console.log("mongoose connected ")
}).catch((e) => {
  console.log("not connected")
  console.log(e)
})

// const Users = mongoose.model('Users', { username: String, password: String, likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/like-product', userController.likeProducts)

app.post('/dislike-product', userController.dislikeProducts)

app.post('/liked-products', userController.likedProducts);

app.post('/my-products', productController.myProducts);


// app.post('/liked-products', (req, res) => {
//   const { userId } = req.body;

//   Users.findOne({ _id: userId })
//       .populate('likedProducts')
//       .then((result) => {
//           res.json({ message: 'Success', products: result.likedProducts });
//       })
//       .catch((err) => {
//           console.error('Error fetching liked products:', err);
//           res.status(500).json({ message: 'Server error' });
//       });
// });


app.post('/add-product', upload.single('pimage'),productController.addProduct)

app.post('/edit-product', upload.single('pimage'),productController.editProduct)

app.post('/approve-product/:pId',productController.approveProducts)

app.post('/edit-profile/:userId', userController.editProfile);

app.get('/search',productController.search);

app.get('/get-products',productController.getProducts);

app.delete('/delete-user/',userController.deleteUser)

app.post('/delete-product',productController.deleteProduct);

app.get('/get-product/:pId',productController.getProductsById );


// app.get('/get-user/:uId',(req,res)=>{
//   const _userId=req.params.uId;
//   Users.findOne({ _id: _userId })
//   .then((result) => {
  
//     res.send({ message: 'Success',user:result})
//   })
//   .catch((err) => {
//     res.send({ message: 'server err' })
//   })
// })

app.get('/get-user/:uId', userController.getUserById);

app.post('/signup', userController.signup);

// app.post('/my-profile/:userId',(req,res)=>{
//   let uid=req.params.userId;
//   Users.findOne({ _id: uid})
//   .then((result)=>{
//     res.send({
//       message:'success',user:{
//         // email:result.email,
//         // mobile:result.mobile,
//         username:result.username
//       }
//     })
//   })
//   .catch(()=>{
//     res.send({message:'server Error'})
//   })
//   return;
// })

app.get('/my-profile/:uId',userController.myProfileById);

app.post('/login', userController.login);

app.post('/admin-login', userController.adminlogin);

let messages=[]

io.on('connection',(socket)=>{
  console.log('socket connected',socket.id);

  socket.on('sendMsg',(data)=>{
    messages.push(data);
    io.emit('getMsg',messages);
  })
  io.emit('getMsg',messages);
  
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})