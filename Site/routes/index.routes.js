var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const userName = req.oidc.user?.name || null;
    res.render('pages/index', {userName});
});

// req.isAuthenticated is provided from the auth router
//router.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//});

module.exports = router;