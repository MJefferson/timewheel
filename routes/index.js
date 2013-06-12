
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Madronessian Wars 2.0' });
};
