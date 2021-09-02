const express = require('express');
const mongoose = require('mongoose');
const { UserRouter } = require('./routes/users');
const { productRouter } = require('./routes/products')
const { customerRouter } = require('./routes/customers')
const { adminOrders } = require('./routes/adminOrders')

const app = express();

mongoose.connect('mongodb://localhost/medicalStoreDB',{ useUnifiedTopology: true, useNewUrlParser: true  })
.then(() => console.log('Connected to database..'))
.catch((err) => console.log('Error in connnecting to database ',err));

app.use('./views',express.static('views'));
app.use(express.static(__dirname + 'views'));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.set('view engine','ejs');

app.use('/user',UserRouter);
app.use('/product', productRouter);
app.use('/customer', customerRouter);
app.use('/adminorders', adminOrders)

app.get('/',(req,res)=>{
    res.render('index');
})

const port = process.env.port || 3000;
const hostname = '127.0.0.1';
app.listen(port,hostname, ()=>{
    console.log(`Server is listening at http://${hostname}:${port}`);
})