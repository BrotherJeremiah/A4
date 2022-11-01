/* jshint esversion: 6 */

/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Syed Moonis Iqbal / Student ID: 120595210 / Date: 13/10/2022
*
********************************************************************************/

const express = require("express");
var path = require("path");
// const exphbs = require("express-handlebars");
var data = require("./modules/officeData.js");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public/css")));

// app.engine('hbs', exphbs.engine({ 
//     extname: '.hbs',
//     partialsDir: __dirname + ''
// }));
// app.set('view engine', '.hbs');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "views/list.html"));
});

app.get("/table", (req, res) => {
    res.sendFile(path.join(__dirname, "views/table.html"));
});

app.get("/audio", (req, res) => {
    res.sendFile(path.join(__dirname, "views/audio.html"));
});

app.get("/storefront.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views/storefront.html"));
});

app.get("/about.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

app.get("/video", (req, res) => {
    res.sendFile(path.join(__dirname, "views/video.html"));
});

app.get("/PartTimer", (req, res) => {
    data.getPartTimers().then((data) => {
        res.json(data);
    });
});

app.get("/employee/:employeeNum", (req, res) => {
    data.getEmployeeByNum(req.params.employeeNum).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/notfound.html"));
});

data.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("Server listening on port: " + HTTP_PORT);
    });
}).catch((err) => {
        console.log("Unable to start server:" + err);
    });
