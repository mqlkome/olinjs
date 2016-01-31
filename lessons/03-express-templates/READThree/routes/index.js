var home = function(req, res){
  res.render("home", {"classes": [
  {name:"Olin.js", teacher: "The fabulous student teaching team"},
  {name:"UOCD", teacher: "Sara Hendren et al"},
  {name: "DREAM", teacher: "Amon"},
  {name: "ProbStat", teacher: "Rehana"}]
  });
};

module.exports.home = home;

