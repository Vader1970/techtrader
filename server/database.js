// This code establishes a connection to a MongoDB database using the Mongoose library. First, an async function called connectToDatabase is defined. Inside this function, we use the mongoose.set() method to set an option that allows for more flexible querying. Then, we use the mongoose.connect() method to connect to the database using the MONGO_URI environment variable and some additional options. If the connection is successful, we log a message indicating the host to which we have connected. If the connection fails, we log an error message. Finally, the connectToDatabase function is exported so that it can be used in other parts of the code.

// connection to our database.
import mongoose from "mongoose";

// Define an async function for connecting to the database
const connectToDatabase = async () => {
  try {
    // Set an option to allow for more flexible querying
    mongoose.set("strictQuery", false);

    // Connect to the MongoDB database using the MONGO_URI environment variable
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // Log a message indicating successful connection to the database
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    // Log an error message if connection to the database fails
    console.log(`Error: ${error.message}`);
  }
};

// Export the connectToDatabase function so it can be used in other parts of the code
export default connectToDatabase;
