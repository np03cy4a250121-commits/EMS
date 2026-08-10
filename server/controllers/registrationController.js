const {
  Registration,
  Event,
  Attendee,
  User,
} = require("../models");


// ==========================
// CREATE REGISTRATION
// ==========================
exports.createRegistration = async (req,res)=>{

try{

const {eventId,userId,attendeeId}=req.body;


// Admin registration
if(attendeeId){

const exists = await Registration.findOne({
where:{
eventId,
attendeeId
}
});


if(exists){
return res.status(400).json({
message:"Already registered"
});
}


const registration = await Registration.create({
eventId,
attendeeId
});


return res.status(201).json({
message:"Registration successful",
registration
});

}



// User registration
if(userId){


const user = await User.findByPk(userId);


if(!user){
return res.status(404).json({
message:"User not found"
});
}



let attendee = await Attendee.findOne({
where:{
email:user.email
}
});



// Create attendee automatically if missing
if(!attendee){

attendee = await Attendee.create({
name:user.name,
email:user.email,
phone:"Not Provided"
});

}



const exists = await Registration.findOne({
where:{
eventId,
attendeeId:attendee.id
}
});


if(exists){
return res.status(400).json({
message:"Already registered"
});
}



const registration = await Registration.create({

eventId,
attendeeId:attendee.id,
userId:user.id

});


return res.status(201).json({
message:"Registration successful",
registration
});


}



return res.status(400).json({
message:"Event and attendee/user required"
});


}
catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

};





// ==========================
// GET ALL REGISTRATIONS
// ==========================
exports.getRegistrations = async(req,res)=>{

try{

const registrations =
await Registration.findAll({

include:[

{
model:Event,
as:"event"
},

{
model:Attendee,
as:"attendee"
}

],

order:[
["id","ASC"]
]

});


res.json(registrations);


}
catch(error){

res.status(500).json({
message:error.message
});

}

};




// ==========================
// GET EVENT REGISTRATIONS
// ==========================
exports.getEventRegistrations = async(req,res)=>{

try{

const registrations =
await Registration.findAll({

where:{
eventId:req.params.eventId
},


include:[

{
model:Attendee,
as:"attendee"
}

]

});


res.json(registrations);


}
catch(error){

res.status(500).json({
message:error.message
});

}

};




// ==========================
// DELETE
// ==========================
exports.deleteRegistration = async(req,res)=>{

try{


const registration =
await Registration.findByPk(req.params.id);



if(!registration){

return res.status(404).json({
message:"Registration not found"
});

}



await registration.destroy();


res.json({
message:"Deleted successfully"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}

};