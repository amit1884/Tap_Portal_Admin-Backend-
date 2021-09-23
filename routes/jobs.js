const express=require('express');
const { addJobController } = require('../Controller/addJobController');
const { getAllJobs } = require('../Controller/getAllJobsController');
const { getPaginatedJobs } = require('../Controller/getPaginatedJobsController');
const requiredLoggedIn = require('../middleware/requiredLoggedIn');
const router=express.Router()

/*
{
        id:1,
        company_name:'Amazon',
        position:'Software Development Engineer',
        ctc:'30 LPA',
        breakdown:'18 LPA'
        eligible_branch:['CSE','ECE','EE'],
        batch:['2024'],
        '10th':'70',
        '12th':'70',
        'graduation':'8',
        'ppt':'21-08-2021',
        'test':'22-08-2021',
        'interview':['23-08-2021','24-08-2021'],
        'jd':'Role for SDE 1 (6 months intern+ FTE)',
        'jd_file':'',
        'deadline':['19-08-2021','23:00:00']
    },

*/

router.post('/addjob',requiredLoggedIn,addJobController);

router.get('/getalljobs',requiredLoggedIn,getAllJobs)

router.get('/getpaginatedjobs',requiredLoggedIn,getPaginatedJobs)

module.exports=router