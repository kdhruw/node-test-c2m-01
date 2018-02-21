var chalk = require('chalk');
var mongoose = require('mongoose');


var dbURI = 'mongodb://localhost/testlo';
//var dbURI = 'mongodb://drulabs:drulabs@ds153577.mlab.com:53577/leavethemarks';


mongoose.connect(dbURI);


mongoose.connection.on('connected', function() {
    console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function(err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function() {
    console.log(chalk.red('Mongoose disconnected'));
});


var restaurantSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    slug: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    tagline: String,
    pic: String,
    cuisine: String,
    address: { type: String, index: true },
    latitude: String,
    longitude: String,
    city: String,
    country: String,
    hasBranches: Boolean,
    updated: { type: Date, default: Date.now },
    established: { type: Number, default: 2018, min: 1900, max: 2018},
    rating: { type: Number, default: 2, min: 1, max: 5},
    comments: [{ body: String, commented_by: String, date: Date }],
});

restaurantSchema.methods.commentCount = function() {
    if (this.comments) {
        return this.comments.length;
    } else {
        return 0;
    }
};

// Pre save HOOK
restaurantSchema.pre('save', function(next) {
    var restaurant = this;

    var lowercaseName = restaurant.name.toLowerCase();
    var slug = lowercaseName.replace(/[^a-zA-Z0-9 ]/g, "");
    var nameWithHyphen = slug.replace(/\s+/g, '-');
    restaurant.slug = nameWithHyphen;

    var city = restaurant.city.toLowerCase();
    var newCity = city.replace(/[^a-zA-Z0-9 ]/g, "");
    var cityWithHyphen = newCity.replace(/\s+/g, '-');
    restaurant.city = cityWithHyphen;

    next();
});

// Build the restaurant model
mongoose.model('Restaurant', restaurantSchema);

// // Users Schema
// var userSchema = new mongoose.Schema({
//     name: { type: String },
//     email: { type: String, unique: true },
//     provider: { type: String, default: "anonymus" },
//     pic: String,
//     profile: { type: String, default: "https://www.mongodb.com/blog" }
// });

// // Build the User model
// mongoose.model('User', userSchema, 'userList');