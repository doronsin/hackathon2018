// // Imports the Google Cloud client library
// const Storage = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage();
const Datastore = require("@google-cloud/datastore");
const datastore = new Datastore({
    projectId: "hack2018-1524731398666"
})
exports.datastore = datastore


var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sessions = require('./routes/sessions'),
    app = express();

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
    res.send('hello world')
})

app.post('/addProduct', function (req, res){
    console.log(req.body.name)
    let body = req.body
    res.send(product.addProduct(body.name, body.desc, body.image, body.userId))
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