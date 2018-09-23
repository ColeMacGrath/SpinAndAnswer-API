exports.addDate = (req, res, next) => {
  req.body.date = Date.now();
  next();
};

exports.checkEmail = (req, res, next) => {
  const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(valid.test(req.body.email)) {
    res.send('invalid mail');
  } else {
    res.send('valid mail');
  }
}

exports.emptyData = (req, res, next) => {
  if(req.body.username === '' || req.body.name === ''
      ||req.body.password === '') {
    res.send('invalid data');
  } else {
    res.send('valid data')
  }
}
