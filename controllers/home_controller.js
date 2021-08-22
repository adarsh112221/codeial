module.exports.home = function (req, res) {
  return res.end("<h1>express is up for codeial</h1>");
};

//module.exports.actionName=function(req,res){}

module.exports.notifications = function (req, res) {
  return res.end("<h1>notifications are here</h1>");
};
