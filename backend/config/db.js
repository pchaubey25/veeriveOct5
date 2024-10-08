import mongoose from "mongoose";
const mongoURI = 'mongodb+srv://chaubeyp:ConsTrack360@veerive.tta8g.mongodb.net/veerive-db?retryWrites=true&w=majority&appName=veerive';

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
