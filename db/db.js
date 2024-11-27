import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fullstack9020:quadx1@cluster0.3agw6.mongodb.net/note_app?retryWrites=true&w=majority&appName=Cluster0')
  } catch (e) {
    console.log(e.message)
  }
}
export default connectMongoDB
