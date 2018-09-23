// Revisa que el email sea válido
exports.checkEmail = (req, res, next) => {
    const valid = '';
    // const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*
    // )|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((
    // [a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valid.test(req.body.email)) {
        res.send('invalid mail');
    } else {
        next();
    }
};

// verfica la existencia de datos vacíos
exports.emptyUserData = (req, res, next) => {
    if (req.body.username === '' || req.body.name === ''
      || req.body.password === '') {
        res.send('invalid data');
    } else {
        next();
    }
};

// valida que se introduza un usuario para agregar como amigo
exports.emptyAddData = (req, res, next) => {
    if (req.body.username === '') {
        res.send('invalid username');
    } else {
        next();
    }
};
