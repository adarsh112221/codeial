module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie('user_id',25)
  return res.render("home", {
    title: "home",
  });
};

//module.exports.actionName=function(req,res){}

module.exports.notifications = function (req, res) {
  return res.end("<h1>notifications are here</h1>");
};
