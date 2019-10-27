function getData(){
    return new Promise(function(resolve,reject){
        reject(new Error("Request is failed"));
    });
}

getData().then().catch(function (err){
    console.log(err);
});