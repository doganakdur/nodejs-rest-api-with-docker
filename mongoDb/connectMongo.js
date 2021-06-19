const mongoose = require('mongoose');

const db = mongoose.connection;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

module.exports = async () => {
    db.on('connecting', () => {
        console.log('Connecting to MongoDB!!');
    });

    db.on('error', (error) => {
        console.error(`Error MongoDB Connection: ${error}`);
    });

    db.on('connected', () => {
        console.log('Connection is established to MongoDB');
    });

    db.on('reconnected', () => {
        console.log('Reconnection is made to MongoDB');
    });

    db.on('disconnected', async () => {
        console.log('MongoDB connection is lost!!');

        await mongoose.connect(process.env.MONGO_URI, options);
    });

    await mongoose.connect(process.env.MONGO_URI, options);
}