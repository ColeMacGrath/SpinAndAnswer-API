// valida que se introduza un usuario para agregar como amigo
function emptyAddData (err, req, res, next) {
    if (req.body.username === '') {
        res.status(400).send('Invalid username');
    } else {
        next();
    }
};
