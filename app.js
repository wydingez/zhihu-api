const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const config = require('./config')
const mongoose = require('mongoose')
const parameter = require('koa-parameter')
const error = require('koa-json-error')
const path = require('path')

const routing = require('./src/routes')

// koa-parameter
parameter(app)

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : { ...rest, stack }
}))

// middlewares
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// db
mongoose.connect(config.mongodb, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  console.log('Mongodb connect success')
})

// routes
routing(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
