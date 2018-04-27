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
    return await server.datastore.runQuery(query)
}

async function addLike(body){
    let x = await server.datastore.get(server.datastore.key([kinds.product, parseInt(body.productId)]))
    console.log(x.likes)
    x = x[0]
    x.likes.push(body.userId)
    server.datastore.save(x)
    ownerProductId = x.userId
    ownerProduct =  await server.datastore.get(server.datastore.key([kinds.user, parseInt(ownerProductId)]))
    ownerProduct = ownerProduct[0]
    ownerProduct.likeUsers.push(userId)

    // server.datastore.get(server.datastore.key(kinds.product,productId), function(err, entity){
    //     console.log('kgj')
    //     console.log(err, entity);
    // });
    // let key = server.datastore.
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
