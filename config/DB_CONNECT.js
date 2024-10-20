require('dotenv').config();
const mongoose= require('mongoose');

const DBURI= process.env.DBURI;

const CONNECT_DB=async ()=>{
    try {
        await mongoose.connect(DBURI);
        console.log(`Db Connected`);
    } catch (error) {
        console.error(error.message);;
    };
};

module.exports = CONNECT_DB;