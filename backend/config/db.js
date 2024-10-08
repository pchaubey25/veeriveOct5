import mongoose from "mongoose";

const configDB = async () => {

    const dbConnection = await mongoose.connect('mongodb+srv://chaubeyp:ConsTrack360@veerive.tta8g.mongodb.net/?retryWrites=true&w=majority&appName=veerive')
    const dbName = dbConnection.connection.name
    console.log('connected to database', dbName)
}

export default configDB
