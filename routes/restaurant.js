var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

exports.allRestaurants = function(req,res){
    Restaurant.find({}, function(err, restaurants){
        if (err){
            res.json(err);
        } else {
            res.json(restaurants);
        }
    });
}

exports.addRestaurant = function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var tagline = req.body.tagline;
    var pic = req.body.pic;
    var cuisine = req.body.cuisine;
    var address = req.body.address;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var city = req.body.city;
    var country = req.body.country;
    var hasBranches = req.body.hasBranches;
    var updated = req.body.updated;
    var established = req.body.established;
    var rating = req.body.rating;
    console.log("Restaurant name: " + req.body.name);
 
    var newRestaurant = new Restaurant();
    newRestaurant.name = name;
    newRestaurant.email = email;
    newRestaurant.pic = pic;
    newRestaurant.cuisine = cuisine;
    newRestaurant.address = address;
    newRestaurant.longitude = longitude;
    newRestaurant.latitude = latitude;
    newRestaurant.city = city;
    newRestaurant.country = country;
    newRestaurant.hasBranches = hasBranches;
    newRestaurant.updated = updated;
    newRestaurant.established = established;
    newRestaurant.rating = rating;
 
    newRestaurant.save(function(err,msg){
        if (err) {
            console.log("Error : While saving the new restaurant");
            res.status(500).send('<h1>Error : While saving the new restaurant</h1>');
        }else{
            res.json(newRestaurant);
        }
    });
}

exports.getRestaurant = function(req,res){
    var requestedSlug = req.params.slug;
    Restaurant.findOne({slug:requestedSlug}, function(err,restaurant){
        if (err) {
            console.log("Error : While searching the restaurant - " + requestedSlug);
            res.status(404).send();
        } else {
            res.json(restaurant);
        }
    });
}

exports.getRestaurantsByCity = function(req,res){
    var city = req.params.city.toLowerCase();
    var newCity = city.replace(/[^a-zA-Z0-9 ]/g, "");
    var cityWithHyphen = newCity.replace(/\s+/g, '-');
    Restaurant.find({city:cityWithHyphen}, function(err,restaurants){
        if(err){
            console.log("Error : While searching for restaurants");
            res.status(404).send();
        } else {
            res.json(restaurants);
        }
    });
}


exports.saveComment=function(req,res){
    var restaurant_slug = req.body.slug;
    var comment = req.body.comment;
    var commented_by = req.body.commented_by;
    var posted_date = new Date();
 
    Restaurant.findOne({slug:restaurant_slug}, function(err,restaurant){
 
        restaurant.comments.push({comment:comment,commented_by:commented_by,date:posted_date});

        restaurant.save(function(err,savedStory){
            if(err){
                console.log("Error : While saving comment for - " + restaurant_slug);
                return res.status(500).send();
            }else{
                res.status(200).send();
            }
        });
 
    });
}