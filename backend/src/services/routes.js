const express = require('express');

const {
	CreateClient,
	RemoveClient,
	AuthenticateClient
} = require('../controllers/client');

const {
	CreateParkingQualification
} = require('../controllers/parkingQualification');

const {
	CreateParkingUser,
	AuthenticateParking
} = require('../controllers/parkingUser');

const {
	CreateCheckInReservation
} = require('../controllers/checkInReservation');

const { CreateClientVehicle } = require('../controllers/clientVehicle');

const { CreateParking, SelectParking } = require('../controllers/parking');

const { CreateParkingSpace } = require('../controllers/parkingSpace');

const { CreateReservation } = require('../controllers/reservation');

const routes = express.Router();

//////////////////////// client

routes.post('/auth-client', AuthenticateClient);

routes.post('/create-client', CreateClient);

routes.delete('/remove-client', RemoveClient);

//////////////////////// client vehicle

routes.post('/create-client-vehicle', CreateClientVehicle);

//////////////////////// parking

routes.post('/select-parkings', SelectParking);

routes.post('/create-parking', CreateParking);

//////////////////////// parking user

routes.post('/auth-parking', AuthenticateParking);

routes.post('/create-parking-user', CreateParkingUser);

//////////////////////// parking space

routes.post('/create-parking-space', CreateParkingSpace);

//////////////////////// parking qualification

routes.post('/create-parking-qualification', CreateParkingQualification);

//////////////////////// reservation

routes.post('/create-reservation', CreateReservation);

routes.post('/create-checkin-reservation', CreateCheckInReservation);

module.exports = routes;
