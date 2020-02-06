const router = require('koa-router')()
const jwt = require('koa-jwt')
const { secret } = require('../../config')

const { 
  find, findById, create, update, delete: del, login, checkOwner, 
  listFollowing, follow, unfollow, listFollowers, checkUserExist,
  followTopic, unfollowTopic, listFollowingTopics, listQuestions,
  listLikingAnswers, likeAnswer, unlikeAnswer,
  listDisLikingAnswers, dislikeAnswer, undislikeAnswer,
  listCollecttingAnswers, collectAnswer, uncollectAnswer
} = require('../controllers/users')

const { checkTopicExist } = require('../controllers/topics')
const { checkAnswerExist } = require('../controllers/answers')


router.prefix('/users')

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, del),
router.post('/login', login)
router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)
router.get('/:id/following', listFollowing)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/following/:id', auth, checkUserExist, unfollow)
router.put('/followTopic/:id', auth, checkTopicExist, followTopic)
router.delete('/followTopic/:id', auth, checkTopicExist, unfollowTopic)
router.get('/:id/followingTopics', listFollowingTopics)
router.get('/:id/questions', listQuestions)

// 点赞
router.get('/:id/likingAnswers', listLikingAnswers)
router.put('/likingAnswers/:id', auth, checkAnswerExist, likeAnswer, undislikeAnswer)
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer)

// 踩
router.get('/:id/dislikingAnswers', listDisLikingAnswers)
router.put('/dislikingAnswers/:id', auth, checkAnswerExist, dislikeAnswer, unlikeAnswer)
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer)

// 收藏
router.get('/:id/collectingAnswers', listCollecttingAnswers)
router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectAnswer)
router.delete('/collectingAnswers/:id', auth, checkAnswerExist, uncollectAnswer)

module.exports = router
