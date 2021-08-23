module.exports.home = function (req, res) {
  return res.render("home", {
    title: "home",
  });
};

//module.exports.actionName=function(req,res){}

module.exports.notifications = function (req, res) {
  return res.end("<h1>notifications are here</h1>");
};
