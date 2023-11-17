const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config()
const app = express();
const conncectDb = require('./config/dbConnection')

const port = process.env.PORT || 5000;


conncectDb().then(() => {
    app.listen(port, ()=> {
        console.log(`Server is running at port ${port}`)
    })
})

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)