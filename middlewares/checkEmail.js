//Valida que el email sea correcto
function checkEmail (err, req, res, next) {
    const valid = '';
    if (valid.test(req.body.email)) {
        res.status(400).send('Invalid mail');
    } else {
        next();
    }
};
