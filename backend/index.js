const express=require("express")
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app=express()
const port = process.env.port || 5000;
const path=require("path")
const http=require("http")
const {Server}=require("socket.io")
const cors= require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ludo",
  });


  
  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
    }
  });

const server=http.createServer(app)

const io=new Server(server)
// app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[]

io.on("connection",(socket)=>{

    socket.on("find",(e)=>{

        if(e.name!=null){

            arr.push(e.name)
            console.log(e.name)

            
            if(arr.length==2){
                let p1obj={
                    p1name:arr[0],
                  
                }
                let p2obj={
                    p2name:arr[1],
              
                }

                let obj={
                    p1:p1obj,
                    p2:p2obj,
                  
                }
                playingArray.push(obj)
                console.log(playingArray)

                arr.splice(0,2)

                io.emit("find",{allPlayers:playingArray})

            }

        }

    })

 


})



app.post("/signup", (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;


var sql = `INSERT INTO signup (uname, mobileNumber) VALUES ("${name}", "${phone}")`
  connection.query(sql, function (err, result) {
    if (err) throw err;
    else{
        console.log("record inserted");
        return res.send(result)
    }
   
  });
});

app.get("/getUserData", (req, res) => {
   
    const userId = req.query.userId;
    console.log(userId)
    const sql = 'SELECT uid, uname, mobileNumber, status FROM signup WHERE mobileNumber = ?';
    connection.query(sql, [userId], function (err, result) {
      if (err) throw err;
      else{
          console.log("record inserted");
          return res.send(result)
      }
  
    });
  });



app.post("/changeStatus", (req, res) => {

  const userId = req.query.userId;

var sql = `INSERT INTO signup (status) VALUES ("active") WHERE mobileNumber = ?`;
  connection.query(sql, [userId],function (err, result) {
    if (err) throw err;
    else{
        console.log("status changed");
        return res.send(result)
    }
   
  });
});


app.get("/",(req,res)=>{
    return res.send("Hello")
})


server.listen(port, () => {
    console.log("server is running on",port);
  });


