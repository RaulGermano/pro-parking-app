const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

async function con() {
	await mongoose.connect(
		'mongodb+srv://appproparking:appproparking@cluster0-5rwc5.mongodb.net/PROParking?retryWrites=true&w=majority',
		// 'mongodb://localhost:27017/PROParkings',
		{ useNewUrlParser: true }
	);
}

con();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3030);
