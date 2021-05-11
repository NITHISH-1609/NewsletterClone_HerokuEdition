const express=require("express");

const bodyParser=require("body-parser");

const request=require("request");

const https=require("https");


const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

})
app.post("/",function(req,res){
    var name=req.body.username;
    var number=req.body.numbers;
    var mail=req.body.mail_id;
    const data={
        members:[{
            email_address: mail,
            status: "subscribed",
            merge_fields: {
              FNAME: name,
              PHONE:number
            }
        }
        ]
    };
    const jsondata=JSON.stringify(data);

    const url="https://us1.api.mailchimp.com/3.0/lists/2c5f281e6b";

    const options={
        method:"POST",
        auth:"Spark:b4621153e2fbbaac2036332983149kab4-us1"
    }

    const store=https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html")
        }
        else
        {
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })

    })
    store.write(jsondata);
    store.end();
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Started Working at port 3000!");
})



app.post("/failure",function(req,res){
    res.redirect("/");

})





//b4621153e2fbbaac2036332983149ab4-us1
//2c5f281e6b