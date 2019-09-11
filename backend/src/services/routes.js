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

const {
	CreateCheckOutReservation
} = require('../controllers/checkOutReservation');

const {
	CreateParkingSpace,
	SelectTotalParkingSpaces,
	SelectActiveParkingSpaces,
	SelectPendingCheckOutParkingSpaces
} = require('../controllers/parkingSpace');

const {
	CreateReservation,
	SelectReservation,
	SelectCheckInPendingReservation,
	SelectTodayReservations,
	SelectCheckOutPendingReservation,
	SelectTodayCountReservations
} = require('../controllers/reservation');

const { CreateClientVehicle } = require('../controllers/clientVehicle');

const { CreateParking, SelectParking } = require('../controllers/parking');

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

routes.get(
	'/select-pending-checkout-parking-spaces',
	SelectPendingCheckOutParkingSpaces
);

routes.get('/select-total-parking-spaces', SelectTotalParkingSpaces);

routes.get('/select-active-parking-spaces', SelectActiveParkingSpaces);

routes.post('/create-parking-space', CreateParkingSpace);

//////////////////////// parking qualification

routes.post('/create-parking-qualification', CreateParkingQualification);

//////////////////////// reservation

routes.get(
	'/select-checkin-pending-reservation',
	SelectCheckInPendingReservation
);

routes.get(
	'/select-checkout-pending-reservation',
	SelectCheckOutPendingReservation
);

routes.get('/select-today-count-reservations', SelectTodayCountReservations);

routes.get('/select-today-reservations', SelectTodayReservations);

routes.get('/select-reservation', SelectReservation);

routes.post('/create-reservation', CreateReservation);

routes.post('/create-checkin-reservation', CreateCheckInReservation);

routes.post('/create-checkout-reservation', CreateCheckOutReservation);

module.exports = routes;
