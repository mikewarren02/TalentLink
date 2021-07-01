const express = require('express');
const router = express.Router();
const models = require('../models')
const { Op } = require("sequelize");
const authenticate = require('../auth')


// localhost:3030/mess/send   (CREATE Message)
router.post('/send',  (req, res) => {

    const userId = req.body.userId;
    const senderId = req.body.senderId;

    models.User.findAll({ 
        where: {
            [Op.or]: [{id: userId}, {id: senderId}]
            
        }
    }).then(users => {
    
        let arr = []

        users.forEach(user =>{
            isBand = user.isBand
            arr.push(isBand)
        })

        if(arr[0] != arr[1]){
            var type = 'Membership'
        } else if(arr[0] === arr[1]){
            var type = 'Collab'
        }

        let message = models.Message.build({

        type: type,
        userId: userId,
        senderId: senderId

    })

    message.save().then(savedMessage => {
        res.json({success: true, message: 'Message sent successfully', message})
    })
    })

})

// localhost:3030/mess/mems   (See Users Membership Request)
router.get('/mems', (req, res) =>{


})


// localhost:3030/mess/colls   (See Users Collab Request)
router.get('/colls', (req, res) =>{
    

})


// localhost:3030/mess/acc (Accepts requests)
router.post('/acc', (req, res) =>{


})


// localhost:3030/mess/acc (Declines requests)
router.post('/acc', (req, res) =>{


})






module.exports = router