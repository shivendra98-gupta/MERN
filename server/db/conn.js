const mongoose = require('mongoose');
const DB=process.env.DATABASE;

//---TO CONNECT WITH MONGODB ATLAS----------START
 mongoose.connect(DB).then(()=>{
    console.log('CONNECTION DONE')
 }).catch((err)=>
        {
            console.log(" NO CONNECTION ")
        }
 )
//---TO CONNECT WITH MONGODB ATLAS----------END
