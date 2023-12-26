const Contacts =require('../Models/ContactModel');

const Connections = async(req,res)=>{
    const {firstname,lastname,email,phoneno,message}=req.body;

    try {
        const oldUser = await Contacts.find({email:email});

        if(!firstname||!lastname||!email||!phoneno){
            res.status(402).send("Please Enter Valid Credentials")
        };

        // if(phoneno!=Number){
        //     res.status(401).send("Please Enter Valid Phone Number")
        // };

        const user = Contacts.create({
            first_name:firstname,
            last_name:lastname,
            email,
            contact_no:phoneno,
            message
        }).then((user)=>{
            res.status(200).json("Your Information Is Saved With Us. We Will Connect With You Shortly.")
        }).catch((err)=>{
            console.log(err);
        });
    } catch (error) {
        console.log(error);
        throw new Error("An Server Error Is Encountered")
    }
};

module.exports= Connections;