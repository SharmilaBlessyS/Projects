const mongoose = require("mongoose");

function Database(){
     
      mongoose.connect("mongodb://localhost:27017/Student").then(()=>{
          console.log(`Database is Connect `);
      }).catch(()=>{
         console.log("Database is Crashed please check a port number");
      })
}

Database()