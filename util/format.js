const moment=require("moment")

function showMessage(username,text){
     return {
        username,text,time:moment().format("h:mm a")
     }
}


module.exports={
    showMessage
}