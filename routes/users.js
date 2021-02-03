var express = require('express');
const User = require("../models/users");
var router = express.Router();
const { body, validationResult } = require('express-validator');


/* GET users listing. */
router.get('/users', function(req, res, next) {
  let users = User.getAll()
  res.send(users);
});

router.post('/user',
    body('name').not().isEmpty(),
    body('phone_number').not().isEmpty().isLength({ min: 10, max:15 }).isNumeric(),
     body('company').not().isEmpty(),
     body('active').not().isEmpty().isBoolean(),
     (req,res,)=>{
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }


  // let user = await User.findById({ phone_number: req.body.phone_number });
  // if (user) return res.status(400).send("User already registered.");
         const user = new User({
             name: req.body.name,
             phone_number: req.body.phone_number,
             company: req.body.company,
             active: req.body.active
         });

         User.create(user, (err, data) => {
             if (err)
                 res.status(500).send({
                     message: err.message || "Some error occurred while creating the User."
                 });
             else res.send(data);
         });
})

router.post('/user', function (req,res, next){

})
module.exports = router;
