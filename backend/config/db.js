import mongoose from "mongoose";

//const mongoURI = 'mongodb+srv://chaubeyp:ConsTrack360@veerive.tta8g.mongodb.net/veerive-db?retryWrites=true&w=majority&appName=veerive';
//const mongoURI = process.env.DB_URL

//for local machine ===============

// const configDB = async () => {

//   const dbConnection = await mongoose.connect(process.env.DB_URL)
//   const dbName = dbConnection.connection.name
//   console.log('connected to database', dbName)
// }

//for server deployment ===============
const configDB = async () => {
    try {
        const dbConnection = await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        const dbName = dbConnection.connection.name
        console.log('connected to database', dbName)
        } catch (err) {
        console.error('Failed to connect to database', err);
      }
    }

export default configDB

/*
- DB URL for local machine - DB_URL=mongodb://localhost:27017/my-local-database
for server - 'mongodb+srv://chaubeyp:ConsTrack360@veerive.tta8g.mongodb.net/veerive-db?retryWrites=true&w=majority&appName=veerive';
*/
