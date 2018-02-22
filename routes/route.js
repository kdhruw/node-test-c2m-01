
exports.index = function(req,res){
    res.send('<h1>Welcome to this page</h1>');
}

exports.index2 = function(req,res){
    res.render('index',{});
}