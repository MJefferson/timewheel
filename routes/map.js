
/*
 * GET home page.
 */

exports.get = function(req, res){
  res.render('map', {title: "Timewheel"});
};
