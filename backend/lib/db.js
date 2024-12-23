import { connect} from "mongoose";

export const connectDB = async() => {
  try {
    const connected = await connect(process.env.MONGO_URI)
    console.log(`MongoDB connected : ${connected.connection.host}`)
  } catch (error) {
    console.log(`Error connecting to MongoDB : ${error.message}`)
    process.exit(1)
  }
}