const Event = require("./Event");
const Attendee = require("./Attendee");
const Registration = require("./Registration");
const Admin = require("./Admin");
const User = require("./userModel");


// Registration belongs to Event
Registration.belongsTo(Event, {
    foreignKey: "eventId",
    as: "event"
});

Event.hasMany(Registration, {
    foreignKey: "eventId",
    as: "registrations"
});



// Registration belongs to Attendee
Registration.belongsTo(Attendee, {
    foreignKey: "attendeeId",
    as: "attendee"
});


Attendee.hasMany(Registration, {
    foreignKey: "attendeeId",
    as: "registrations"
});



// User Registration
User.hasMany(Registration,{
    foreignKey:"userId",
    as:"registrations"
});


Registration.belongsTo(User,{
    foreignKey:"userId",
    as:"user"
});


module.exports = {
    Event,
    Attendee,
    Registration,
    Admin,
    User
};
