function upper(req, res, next) {
  console.log(req.body.name);
  req.body.name = req.body.name.toUpperCase();
  next();
}

module.exports = upper;
