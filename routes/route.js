exports.index = function(req, res) {
    //res.send('<h1>Welcome to this page</h1>');
    res.render('home', {});
};

exports.swagger = function(req,res){
    console.log("loading swagger ui");
    res.render('index',{});
};