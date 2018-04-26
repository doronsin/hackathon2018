const Datastore = require("@google-cloud/datastore");
const datastore = new Datastore({
    projectId: kinds.projectId
})
const kinds = require("./kinds")

let key = datastore.key(["or"])
const entity = {
    key: key,
    data: {
        "test": true
    },
};


datastore.save(entity)
.then(x => {
    console.log("done saving to data")
})
.catch(err =>{
    console.log("Error");
    console.log(err)
})

function signup(username, userpassword,phon){
    let key = datastore.key([kinds.user])
    let data = {
        username, //equivalent to username : username
        userpassword,
        phon,
        likeUsers = []
    }
    return datastore.save({
        key,
        data
    })
}

