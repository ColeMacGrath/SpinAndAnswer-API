// verfica la existencia de datos vacíos
function emptyUserData (err, req, res, next) {
    if (req.body.username === '' || req.body.name === ''
      || req.body.password === '') {
        res.status(400).send('Invalid data');
    } else {
        next();
    }
};
