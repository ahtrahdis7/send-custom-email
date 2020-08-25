var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editor', { title: 'HTML EDITOR' });
});

router.post('/', (req, res) => {
    
})

module.exports = router;
