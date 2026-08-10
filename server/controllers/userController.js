const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    User,
    Attendee,
    Registration,
    Event
} = require("../models");



// ==========================
// USER SIGNUP
// ==========================
exports.signup = async (req, res) => {

try {

    const {
        name,
        email,
        password
    } = req.body;



    if (!name || !email || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }



    const existingUser = await User.findOne({
        where:{
            email
        }
    });



    if(existingUser){

        return res.status(400).json({
            message:"Email already exists"
        });

    }



    const hashedPassword =
        await bcrypt.hash(password,10);



    const user = await User.create({

        name,
        email,
        password: hashedPassword

    });



    // Create attendee automatically

    const attendeeExists =
        await Attendee.findOne({

            where:{
                email
            }

        });



    if(!attendeeExists){

        await Attendee.create({

            name,
            email,
            phone:"N/A"

        });

    }



    res.status(201).json({

        message:"Account created successfully",

        user

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
// USER LOGIN
// ==========================

exports.login = async(req,res)=>{

try{


const {
    email,
    password
}=req.body;



const user = await User.findOne({

    where:{
        email
    }

});



if(!user){

    return res.status(400).json({

        message:"Invalid email or password"

    });

}



const match =
await bcrypt.compare(
    password,
    user.password
);



if(!match){

    return res.status(400).json({

        message:"Invalid email or password"

    });

}




const token = jwt.sign(

{
    id:user.id,
    role:"user"
},

process.env.JWT_SECRET,

{
    expiresIn:"1d"
}

);



res.json({

    message:"Login successful",

    token,

    user

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
// USER REGISTER EVENT
// ==========================

exports.registerEvent = async(req,res)=>{


try{


const {
    eventId
}=req.body;



if(!eventId){

    return res.status(400).json({

        message:"Event is required"

    });

}



// logged user

const user = await User.findByPk(
    req.user.id
);



if(!user){

    return res.status(404).json({

        message:"User not found"

    });

}



// check event

const event = await Event.findByPk(eventId);



if(!event){

    return res.status(404).json({

        message:"Event not found"

    });

}




// find attendee profile

const attendee = await Attendee.findOne({

    where:{
        email:user.email
    }

});



if(!attendee){

    return res.status(404).json({

        message:"Attendee profile not found"

    });

}




// duplicate registration check

const exists = await Registration.findOne({

    where:{

        eventId,

        attendeeId:attendee.id

    }

});



if(exists){

    return res.status(400).json({

        message:"Already registered for this event"

    });

}




const registration = await Registration.create({

    eventId,

    attendeeId:attendee.id,

    userId:user.id

});



res.status(201).json({

    message:"Registration successful",

    registration

});



}
catch(error){

console.log(error);


res.status(500).json({

    message:error.message

});


}


};