const Comment = require('../models/comments')

class CommentsCtrl {
  async find (ctx) {
    const { per_page = 10} = ctx.query
    const perPage = Math.max(per_page * 1, 1)
    const page = Math.max(ctx.query.page * 1, 1) - 1

    const q = new RegExp(ctx.query.q)
    const { rootCommentId } = ctx.query
    ctx.body = await Comment
      .find({ content: q, questionId: ctx.params.questionId, answerId: ctx.params.answerId, rootCommentId })
      .limit(perPage).skip(page * perPage)
      .populate('commentator replyTo')
  }
  async findById (ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const comment = await Comment.findById(ctx.params.id).select(selectFields).populate('commentator')
    ctx.body = comment
  }
  async checkCommentExist (ctx, next) {
    const comment = await Comment.findById(ctx.params.id).select('+commentator')
    if (!comment) {
      ctx.throw(404, '评论不存在')
    }
    // 只有在删改查答案的时候才检查此逻辑，赞和踩的时候不校验
    if (ctx.params.questionId && comment.questionId !== ctx.params.questionId) {
      ctx.throw(404, '该问题下没有此答案')
    }
    if (ctx.params.answerId && comment.answerId !== ctx.params.answerId) {
      ctx.throw(404, '该答案下没有此答案')
    }
    ctx.state.comment = comment
    await next()
  }
  async create (ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
      rootCommentId: { type: 'string', required: false },
      replyTo: { type: 'string', required: false }
    })
    const comment = await new Comment({...ctx.request.body, commentator: ctx.state.user._id, questionId: ctx.params.questionId, answerId: ctx.params.answerId}).save()
    ctx.body = comment
  }
  async checkCommentator (ctx, next) {
    const { comment, user } = ctx.state
    if (comment.commentator.toString() !== user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }
  async update (ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false }
    })
    const { content } = ctx.request.body
    await ctx.state.comment.update({ content })
    ctx.body = ctx.state.comment
  }
  async delete (ctx) {
    await Comment.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new CommentsCtrl()