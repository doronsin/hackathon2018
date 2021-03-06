// // Imports the Google Cloud client library
// const Storage = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage();
const cors = require("cors")
const Datastore = require("@google-cloud/datastore");
const datastore = new Datastore({
    projectId: "hack2018-1524731398666",
    keyFilename: "hack2018-80d90da6fa29.json"

})

exports.datastore = datastore


var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sessions = require('./routes/sessions'),
    app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.get('/', function (req, res) {
    res.send('hello world3')
})

app.get('/getAllProducts', async function(req,res){
    let productList = await product.getAllProducts() 
    res.send(productList[0])
})


app.post('/addLike',async function(req,res){
    let isMatch = await product.addLike(req.query.productId, req.query.userId)
    res.send(isMatch)
})


app.post('/addProduct', async function (req, res){
    let body = req.params.json
    let id = await product.addProduct(req.query.name, req.query.desc, req.query.image, req.query.userId)
    res.send(id)
})


// app.get("/checkLike", function(req,))


// app.get('/sessions/:id', sessions.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var product = require('./product')



// datastore.save(entity)
// .then(x => {
//     console.log("done saving to data")
// })
// .catch(err =>{
//     console.log("Error");
//     console.log(err)
// }).
// product.addProduct("a","c","d","e").then(productId => {
//     console.log("*****************" + productId)
//     product.addLike("hhb", productId)
// })
// .then(x => {    
//     console.log("done saving to data")
//     productId = x
//     
//     })
//     .catch(err =>{
//         console.log("Error");
//         console.log(err)
//     })

   

// .then(x => {
//     console.log("done saving to data")
// })
// .catch(err =>{
//     console.log("Error");
//     console.log(err)
// }) 