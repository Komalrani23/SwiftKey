const express = require("express");
const app = express();
app.use(express.json()); 
const body_parser=require("body-parser");

app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get("/sign", (req, res) => {
    res.sendFile(__dirname+"/Signup.html");
});

app.get("/log", (req, res) => {
    res.sendFile(__dirname+"/Login.html");
});

app.get('/contact',(req, res) => {
    res.sendFile(__dirname+"/Contact.html");
})

app.get('/guest',(req, res) => {
    res.sendFile(__dirname+"/Home.html");
})

app.get('/user',(req, res) => {
    res.sendFile(__dirname+"/Afterlogin.html");
})

app.post("/logg", (req, res) => { 
     var email=req.body.email;
     var pass=req.body.pass;
      function connection1(){
        var login="";
        let l;
        const MongoClient = require('mongodb').MongoClient;
          const uri = "mongodb+srv://Shivam:Hanna-123@cluster0.gqafmx3.mongodb.net/?retryWrites=true&w=majority";
          const client = new MongoClient(uri, { useNewUrlParser: true });
          client.connect(async (err) => {
          const collection = client.db('Hanna').collection('signup');
          await collection.findOne({"email":req.body.email}, function (err, result) {
            if (err) {
                console.log("Error");
            }
            if (result !== null) {
                
                console.log("Email Sahi he");
                 login="yes";
                 let l=1;
            } else {
              
                console.log("Email Wrong he");           
                login="no" 
                let l=0;              
            }
        });


        if(!l){
            await collection.findOne({"pass":req.body.pass}, function (er,rs) {
                if (er) {
                    console.log("Error");
                }
                if (rs !== null) {
                    console.log("Email And Pass Sahi he");
                   return res.redirect("/user");
                } else {
                    console.log("Email sahi he lekin Pass wrong he");
                    return res.redirect("/log");
                }
            });
        }
        if(l){
            return res.redirect('/sign');
        }
        });
        }
    connection1();
});

app.post("/signup", (req, res) => {   
    var name=req.body.name;
    var email=req.body.email;
    var pass=req.body.pass;
    var cpass=req.body.cpass;
    var clgname=req.body.clgname;
    var subname=req.body.subname;
    var phone=req.body.phone;
    console.log("Hello Pat");
   async function main() {
    const MongoClient = require('mongodb').MongoClient;
    const uri ="mongodb+srv://Shivam:Hanna-123@cluster0.gqafmx3.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect((err) => {
      const collection = client.db('Hanna').collection('signup');
      collection.insertOne({name:name,email:email,pass:pass,cpass:cpass,clgname:clgname,subname:subname,phone:phone});
        console.log("Saved Data");
        return res.redirect('/log');
    });
  }
  main().catch(console.error);
});



const PORT = process.env.PORT || 3000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));