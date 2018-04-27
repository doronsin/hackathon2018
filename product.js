var kinds = require("./kinds")
var server = require('./server') 

async function addProduct(name, desc, image, userId){
    let key = server.datastore.key(kinds.product)
    let data = {
        name,
        desc,
        image,
        userId,  
        likes : []
    }
    await server.datastore.save({
        key,
        data
    })
    return key.id
}

async function getAllProducts(){
    const query = server.datastore.createQuery(kinds.product)
    let products = await server.datastore.runQuery(query)
    console.log(products)
    return products[0].map(product => {
        product.id = product[server.datastore.KEY].id
        return product
    })
}

async function addLike(body){
    let x = await server.datastore.get(server.datastore.key([kinds.product, parseInt(body.productId)]))
    x = x[0]
    console.log(x.likes)
    if (x.likes.indexOf(body.userId)<0) {
        x.likes.push(body.userId)
    }
    server.datastore.save(x)
    ownerProductId = x.userId
    // ownerProduct =  await server.datastore.get(server.datastore.key([kinds.user, parseInt(ownerProductId)]))
    return await checkMatch(body.userId, ownerProductId)
}

async function checkMatch(userId,ownerProductId){
    const query = server.datastore.createQuery(kinds.product).filter('userId', '=', parseInt(userId))
    productsUser = await server.datastore.runQuery(query)
    productsUser = productsUser[0]
    productsUser.forEach(element => {
        console.log(element)
        if (element.likes.contains(parseInt(ownerProductId))){
            return true
        }     
    });
    return false
}

function checkLike(body){
    body.productId
    body.userId
}



module.exports = {
    addProduct : addProduct,
    addLike : addLike,
    getAllProducts: getAllProducts
}
