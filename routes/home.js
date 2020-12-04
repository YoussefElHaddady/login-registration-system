const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  res.json({
    homeContent: {
      title: 'Home page of top secret world',
      description: "You sholdn't have access to this data.",
      user: req.user,
    },
  });
});

module.exports = router;
