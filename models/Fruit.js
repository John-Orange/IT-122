import mongoose from 'mongoose';
import {connectionString} from "../credentials.js";
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
//const connectionString = "mongodb+srv://johnwork:zhongyuanwork@cluster0.phvv2ma.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    dbName: 'class-projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const fruitSchema = new Schema({
 name: { type: String, required: true },
 color: String,
 calories: Number,
 orgin: String,
 taste: String
});

export const Fruits = mongoose.model('Fruits', fruitSchema);
