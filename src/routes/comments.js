const router = require('koa-router')()
const jwt = require('koa-jwt')
const { secret } = require('../../config')
const { find, findById, checkCommentExist, create, checkCommentator, update, delete: del} = require('../controllers/comments')

router.prefix('/questions/:questionId/answers/:answerId/comments')

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkCommentExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkCommentExist, checkCommentator, update)
router.delete('/:id', auth, checkCommentExist, checkCommentator, del)

module.exports = router
