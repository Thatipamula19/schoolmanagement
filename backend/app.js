const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose")

const adimisionRoutes = require("./routes/adimision");
const resultRoutes = require("./routes/result");
const feesRoutes = require("./routes/fees");
const employeeRoutes = require("./routes/employee");
const adiminRouters = require("./routes/adimin");

const app = express();

mongoose.connect("mongodb://localhost:27017/school")
    .then(() => {
        console.log("Conneted to Database!");
    })
    .catch(() => {
        console.log("Connection Failed!");
    })


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/adimision", adimisionRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/adimin", adiminRouters);

module.exports = app;
