const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

mongoose.connect(
	// 'mongodb+srv://appproparking:appproparking@cluster0-5rwc5.mongodb.net/PROParking?retryWrites=true&w=majority',
	'mongodb://localhost:27017/PROParkings',
	{ useNewUrlParser: true }
);

server.use(express.json());
server.use(routes);
server.use(cors());

server.listen(3030);
