const mongoose = require ('mongoose');

const {isEmail} = require('validator');

const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema({

    email: {
        type : String,
        required : [true , 'please enter an email'],
        unique : true,
        lowercase : true,
        validate: [isEmail, 'please enter a valid email']
    },
    password : {
        type : String,
        required : [true , 'please enter a password'],
        minlength : [6 , 'Min length is 6 characters']
    }

});

//fire a function if a new user has been saved in a database

userSchema.post('save', function (doc,next){

    console.log('new user was created and saved', doc);
    next();
})

//fire a function before a new user has been saved in a database

userSchema.pre('save', async function (next){
// install Bcrypt
//attaching a salt that is as string and hashing the password
    const salt= await bcrypt.genSalt();
    this.password = await bcrypt.hash(this. password, salt);
    console.log('new about to be created and saved', this);
    next();
});

//static method to login the user

userSchema.statics.login = async function(email, password) {

    const user = await this.findOne ({email});

    if(user){

     const auth = await  bcrypt.compare(password , user.password);

     if(auth){
        return user;
     }
     
     throw Error ('incorrect password');
    }
    throw Error ('Incorrect Email');
}
const User = mongoose.model('user', userSchema);

module.exports= User;