const router = require('koa-router')()
const jwt = require('koa-jwt')
const { secret } = require('../../config')
const { find, findById, create, update, listTopicFollowers, checkTopicExist, listQuestions } = require('../controllers/topics')

router.prefix('/topics')

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkTopicExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkTopicExist, update)
router.get('/:id/followers', checkTopicExist, listTopicFollowers)
router.get('/:id/questions', checkTopicExist, listQuestions)

module.exports = router
