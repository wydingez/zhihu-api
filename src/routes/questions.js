const router = require('koa-router')()
const jwt = require('koa-jwt')
const { secret } = require('../../config')
const { find, findById, checkQuestionExist, create, checkQuestioner, update, delete: del} = require('../controllers/questions')

router.prefix('/questions')

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkQuestionExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update)
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del)

module.exports = router
