const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		// connecting local db (for dev purpose only)

		// const conn = await mongoose.connect(
		// 	'mongodb://localhost:27017/wordnook',
		// 	{
		// 		useNewUrlParser: true,
		// 		useUnifiedTopology: true,
		// 	}
		// );

		// db for production
		const conn = await mongoose.connect('mongodb+srv://admin:admin@cluster0.bp37d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
