const dotenv=require("dotenv");
const {MongoClient}=require('mongodb');
const mongoose=require("mongoose");




const DB="mongodb+srv://Shivam:Hanna-123@cluster0.gqafmx3.mongodb.net/test";
async function connection(){
mongoose.connect(DB).then(()=>{
    console.log("Connection Success..");
}).catch((err)=>console.log(err));
}
module.exports=connection;


// async function main() {
//     const MongoClient = require('mongodb').MongoClient;
//     const uri =
//       'mongodb+srv://dbUser:<dbpassword>@cluster0.dcu5m.mongodb.net/sample_airbnb?retryWrites=true&w=majority';
//     const client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect((err) => {
//       const collection = client.db('Hanna').collection('login');
//       // perform actions on the collection object
//       client.close();
//     });
//   }
//   main().catch(console.error);