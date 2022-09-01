// 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

//teest uopdate
const express = require('express');
const app=express();
const path =require('path');
const ejs = require("ejs");
const mongoose = require('mongoose');
const Parcel = require('./models/parcel');

app.engine("html", ejs.renderFile);
app.use("/css", express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")));
app.set("view engine", "html");
app.use(express.static("public/css"));
app.use(express.static("public/images"));


app.use(express.urlencoded({extended:false}));


const url ='mongodb://localhost:27017/parcelDB';
app.listen(8080);
mongoose.connect(url, function(err){
    if(err === null)
    console.log('Connected Successfully');

    app.get("/",function(req,res){
        res.sendFile(path.join(__dirname,"views/index.html"));
    
    });
    
    app.get("/index.html",function(req,res){
        res.sendFile(path.join(__dirname,"views/index.html"));
    
    });

    app.get("/addparcel.html",function(req,res){
        res.sendFile(path.join(__dirname,"views/addparcel.html"));
    })

    app.post("/addparcel",function(req,res){
        let parcelDetails = req.body;
        let parcel = new Parcel({
            sender: parcelDetails.sender,
            address: parcelDetails.address,
            weight: parcelDetails.weight,
            fragile: parcelDetails.fragile,
        });
        parcel.save(function(err){
            if (err) console.log("unable to save");
            else console.log("saved successfully");
        });
        res.redirect("/");
    
    
    });

    app.get("/getparcels.html",function(req,res){
       let parcels = Parcel.find()
            res.render("getparcels.html",{parcelDb : parcels});
        
});

app.get("/deleteparcel.html",function(req,res){
    res.sendFile(path.join(__dirname,"views/deleteparcel.html"));

});

app.post("/deleteparcel",function(req,res){
    let id = req.body.id;
    Parcel.findByIdAndDelete(id ,function (err,docs){
        if (err === null)
        console.log("deleted");
    });


});

app.post("/deleteparcelbysender",function(req,res){
    let sender = req.body.sender;
    Parcel.deleteOne({sender:sender} ,function (err,docs){
        if (err === null)
        console.log("deleted");
    });


});

app.post("/deleteparcelbyfragile",function(req,res){
    let fragile = req.body.fragile;
    Parcel.deleteOne({fragile:fragile} ,function (err,docs){
        if (err === null)
        console.log("deleted");
    });


});




app.get("/updateparcel",function(req,res){
    res.sendFile(path.join(__dirname,"views/updateparcel.html"));

});

app.post("/updateparcel",function(req,res){
    let parcelDetails = req.body;
    let id = req.body.id
    let filter = id;
    let theUpdate ={
        $set: {
            sender: parcelDetails.newsender,
            address: parcelDetails.newaddress,
            weight: parcelDetails.newweight,
            fragile: parcelDetails.newfragile,
        },
    };
    Parcel.findByIdAndUpdate(id, theUpdate ,function (err,docs){
        if (err === null)
        console.log("updated");
    });
    res.redirect("/");


});

});