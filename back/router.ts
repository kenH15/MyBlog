export{}
const Router = require('@koa/router');
const router = new Router();
router.prefix('/api')

const articles = require('./routes/articles');
const users = require('./routes/users');
const uploads = require('./routes/uploads');
const comments = require('./routes/comments')

router.use(articles.routes(),articles.allowedMethods());
router.use(users.routes(),users.allowedMethods());
router.use(uploads.routes(),uploads.allowedMethods());
router.use(comments.routes(),comments.allowedMethods());

module.exports  = router;

