const Delete = (callback)=> {
    log();
    //callback(true);
    setTimeout(()=>{
        callback(true);
    },5000);

};

const log = () =>{
    console.log("delete");
}

// (()=>{
//     log("NoName func")
// })();