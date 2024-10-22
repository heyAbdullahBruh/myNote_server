require('dotenv').config();
const app = require("./app");
const CONNECT_DB = require('./config/DB_CONNECT');

const port = process.env.PORT;

app.listen(port,async()=>{
    await CONNECT_DB();
    console.log(`Server is start . server link http://localhost:${port}`);
});
