const express = require('express');
const router = express.Router();
const models = require('../models')
const { Op } = require("sequelize");
const authenticate = require('../auth')


// localhost:3030/memco/member   (CREATE MEMBERSHIP)
router.post('/member',  (req, res) => {
    const userId = req.body.userId;
    const bandId = req.body.bandId;
    
    let member = models.Membership.build({

        userId: userId,
        bandId: bandId
    })

    member.save().then(savedMember => {
        res.json({success: true, message: 'Membership saved successfully'})
    })

})

// localhost:3030/memco/collab   (CREATE COLLAB)
router.post('/collab',  (req, res) => {
    const senderId = req.body.sender;
    const receiverId = req.body.receiver;
    
    let collab = models.Membership.build({

        senderId: senderId,
        receiverId: receiverId
    })

    collab.save().then(savedCollab => {
        res.json({success: true, message: 'Collab saved successfully'})
    })

})


// localhost:3030/memco/req-m/:targetId (GET User Memberships)
router.get('/req-m/:targetId', (req, res) => {
    const targetId = req.params.targetId

    models.Membership.findAll({
        where: {
            [Op.or]: [
                {userId: targetId}
             ,
                {bandId:  targetId}
 
            ]
        }, 
        order: [
            ['id', 'DESC']
          ]

    }).then(memberships => res.json(memberships))
    .catch(err => res.json({message: 'No Memberships Found'}))
})


// localhost:3030/memco/req-c/:userId (GET User Collabs)
router.get('/req-c/:targetId', (req, res) => {
    const targetId = req.params.targetId

    models.Collab.findAll({
        where: {
            [Op.or]: [
                {senderId: targetId}
             ,
                {receiverId:  targetId}
 
            ]
        }, 
        order: [
            ['id', 'DESC']
          ]

    }).then(collab => res.json(collab))
    .catch(err => res.json({message: 'No Collab Found'}))
})




















module.exports = router