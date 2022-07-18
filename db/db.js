const mongoose=require('mongoose');
require('dotenv').config();
const {CONNECTION_STRING} = process.env;
class db{

   constructor(){     
   }

   async connect(){
       const url= CONNECTION_STRING;
       await mongoose.connect(url);
       console.log(`connected successfully with mongoose💞💥💔`);
   };
}

module.exports=new db();