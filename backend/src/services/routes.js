const express = require('express');

const {
	CreateClient,
	AuthenticateClient,
	SelectClientInformations
} = require('../controllers/client');

const {
	CreateParkingQualification
} = require('../controllers/parkingQualification');

const {
	CreateParkingUser,
	AuthenticateParking,
	SelectSpecificParkingUser
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
	SelectPendingCheckOutParkingSpaces,
	SelectSpecificParkingSpace,
	SelectAllParkingSpaces
} = require('../controllers/parkingSpace');

const {
	CreateReservation,
	SelectReservation,
	SelectCheckInPendingReservation,
	SelectTodayReservations,
	SelectMonthReservations,
	SelectCheckOutPendingReservation,
	SelectTodayCountReservations,
	SelectTodayTicketReservations
} = require('../controllers/reservation');

const {
	CreateClientVehicle,
	SelectClientVehicles
} = require('../controllers/clientVehicle');

const {
	CreateParking,
	SelectParkings,
	SelectSpecificParkings
} = require('../controllers/parking');

const routes = express.Router();

//////////////////////// client

routes.get('/select-client-informations', SelectClientInformations);

routes.post('/auth-client', AuthenticateClient);

routes.post('/create-client', CreateClient);

//////////////////////// client vehicle

routes.post('/create-client-vehicle', CreateClientVehicle);

routes.get('/select-client-vehicles', SelectClientVehicles);

//////////////////////// parking

routes.get('/select-parkings', SelectParkings);

routes.get('/select-specific-parkings', SelectSpecificParkings);

routes.post('/create-parking', CreateParking);

//////////////////////// parking user

routes.get('/select-specific-parking-user', SelectSpecificParkingUser);

routes.post('/auth-parking-user', AuthenticateParking);

routes.post('/create-parking-user', CreateParkingUser);

//////////////////////// parking space

routes.get(
	'/select-pending-checkout-parking-spaces',
	SelectPendingCheckOutParkingSpaces
);

routes.get('/select-all-parking-spaces', SelectAllParkingSpaces);

routes.get('/select-specific-parking-space', SelectSpecificParkingSpace);

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

routes.get('/select-today-ticket-reservations', SelectTodayTicketReservations);

routes.get('/select-today-reservations', SelectTodayReservations);

routes.get('/select-month-reservations', SelectMonthReservations);

routes.get('/select-reservation', SelectReservation);

routes.post('/create-reservation', CreateReservation);

routes.post('/create-checkin-reservation', CreateCheckInReservation);

routes.post('/create-checkout-reservation', CreateCheckOutReservation);

module.exports = routes;
