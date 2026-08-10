const {
    Event,
    Attendee,
    Registration
} = require("../models");


const { Op } = require("sequelize");


exports.getDashboard = async(req,res)=>{

try{


const totalEvents = await Event.count();


const totalAttendees = await Attendee.count();


const totalRegistrations = await Registration.count();



const upcomingEvents = await Event.count({

    where:{
        date:{
            [Op.gte]:
            new Date()
            .toISOString()
            .split("T")[0]
        }
    }

});



const latestActivities = await Registration.findAll({

    limit:5,

    order:[
        ["createdAt","DESC"]
    ],


    include:[

        {
            model:Event,
            as:"event",
            attributes:[
                "name"
            ]
        },


        {
            model:Attendee,
            as:"attendee",
            attributes:[
                "name"
            ]
        }

    ]

});



console.log(
JSON.stringify(latestActivities,null,2)
);



res.json({

    totalEvents,
    totalAttendees,
    totalRegistrations,
    upcomingEvents,
    latestActivities

});


}

catch(error){

console.log(
"Dashboard Error:",
error
);


res.status(500).json({

message:error.message

});


}

};