const express = require('express');

const {
	CreateClient,
	AuthenticateClient,
	UpdateClientInformations,
	SelectClientInformations
} = require('../controllers/client');

const {
	CreateParkingQualification
} = require('../controllers/parkingQualification');

const {
	CreateParkingUser,
	DesableParkingUser,
	AuthenticateParking,
	SelectSpecificParkingUser,
	UpdatePasswordParkingUser,
	SelectSpecificParkingUsers,
	UpdateParkingUserInformations,
	SelectCounterSpecificParkingUsers,
	SelectCounterEnableDesableSpecificParkingUsers
} = require('../controllers/parkingUser');

const {
	CreateCheckInReservation
} = require('../controllers/checkInReservation');

const {
	CreateCheckOutReservation
} = require('../controllers/checkOutReservation');

const {
	CreateParkingSpace,
	SelectAllParkingSpaces,
	SelectTotalParkingSpaces,
	SelectActiveParkingSpaces,
	SelectSpecificParkingSpace,
	SelectAvailableParkingSpaces,
	SelectPendingCheckOutParkingSpaces
} = require('../controllers/parkingSpace');

const {
	CreateReservation,
	SelectReservation,
	SelectTodayReservations,
	SelectMonthReservations,
	SelectClientReservations,
	SelectTodayCountReservations,
	SelectTodayTicketReservations,
	SelectCheckInPendingReservation,
	SelectVehicleClientReservations,
	SelectCheckOutPendingReservation
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

routes.put('/update-client-informations', UpdateClientInformations);

//////////////////////// client vehicle

routes.post('/create-client-vehicle', CreateClientVehicle);

routes.get('/select-client-vehicles', SelectClientVehicles);

//////////////////////// parking

routes.get('/select-parkings', SelectParkings);

routes.get('/select-specific-parkings', SelectSpecificParkings);

routes.post('/create-parking', CreateParking);

//////////////////////// parking user

routes.get(
	'/select-counter-specific-parking-users',
	SelectCounterSpecificParkingUsers
);

routes.get(
	'/select-counter-excluded-specific-parking-users',
	SelectCounterEnableDesableSpecificParkingUsers
);

routes.get('/select-specific-parking-user', SelectSpecificParkingUser);

routes.get('/select-specific-parking-users', SelectSpecificParkingUsers);

routes.post('/auth-parking-user', AuthenticateParking);

routes.post('/create-parking-user', CreateParkingUser);

routes.put('/update-parking-user-informations', UpdateParkingUserInformations);

routes.put('/update-password-parking-user', UpdatePasswordParkingUser);

routes.put('/desable-parking-user', DesableParkingUser);

//////////////////////// parking space

routes.get(
	'/select-pending-checkout-parking-spaces',
	SelectPendingCheckOutParkingSpaces
);

routes.get('/select-all-parking-spaces', SelectAllParkingSpaces);

routes.get('/select-available-parking-spaces', SelectAvailableParkingSpaces);

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

routes.get(
	'/select-vehicle-client-reservations',
	SelectVehicleClientReservations
);

routes.get('/select-client-reservations', SelectClientReservations);

routes.get('/select-today-count-reservations', SelectTodayCountReservations);

routes.get('/select-today-ticket-reservations', SelectTodayTicketReservations);

routes.get('/select-today-reservations', SelectTodayReservations);

routes.get('/select-month-reservations', SelectMonthReservations);

routes.get('/select-reservation', SelectReservation);

routes.post('/create-reservation', CreateReservation);

routes.post('/create-checkin-reservation', CreateCheckInReservation);

routes.post('/create-checkout-reservation', CreateCheckOutReservation);

module.exports = routes;
