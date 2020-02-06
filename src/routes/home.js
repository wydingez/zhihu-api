const router = require('koa-router')()
const { index, upload } = require('../controllers/home')

router.get('/', index)
router.post('/upload', upload)

module.exports = router
