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
    products[0].map(product => {
        product.id = product[server.datastore.KEY].id
        return product
    })
    return products
}

async function addLike(productId, userId){
    let x = await server.datastore.get(server.datastore.key([kinds.product, parseInt(productId)]))
    x = x[0]
    if (x.likes.indexOf(userId)<0) {
        x.likes.push(userId)
        server.datastore.save(x)
    }
    ownerProductId = x.userId
    // ownerProduct =  await server.datastore.get(server.datastore.key([kinds.user, parseInt(ownerProductId)]))
    return await checkMatch(userId, ownerProductId)
}

async function checkMatch(userId,ownerProductId){
    const query = server.datastore.createQuery(kinds.product).filter('userId', '=', userId)
    productsUser = await server.datastore.runQuery(query)
    productsUser = productsUser[0]
    var i
    for (i=0; i< productsUser.length; i++) {
        var j;
        for (j=0; j< productsUser[i].likes.length; j++) {
            if (parseInt(productsUser[i].likes[j]) == parseInt(ownerProductId)) {
                return true
            }
        }
    }
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
