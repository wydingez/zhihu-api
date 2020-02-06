const router = require('koa-router')()
const jwt = require('koa-jwt')
const { secret } = require('../../config')
const { find, findById, checkAnswerExist, create, checkAnswerer, update, delete: del} = require('../controllers/answers')

router.prefix('/questions/:questionId/answers')

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkAnswerExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update)
router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del)

module.exports = router
