import mongoose from "mongoose";

const configDB = async () => {

    const dbConnection = await mongoose.connect(process.env.DB_URL)
    const dbName = dbConnection.connection.name
    console.log('connected to database', dbName)
}

export default configDB