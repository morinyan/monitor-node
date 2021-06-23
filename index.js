const Koa = require('koa');
const path = require('path');
const views = require('koa-views');

const app = new Koa();
const libs = require('./libs');
const sign = require('./signature');

app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

app.use(async ctx => {
  const startTs = parseInt((new Date().setHours(0,0,0) - 13 * 24 * 60 * 60 * 1000) / 1000);
  const endTs = parseInt(new Date() / 1000);

  const query = Object.assign({
    sdkAppId: '',
    startTs,
    endTs,
    roomNum: '',
    userId: '',
    // createTime: '',
    // destroyTime: '',
    // duration: '',
    // sendUserId: '',
    // receiveUserId: '',
    // commId: '',
    // userNum: '',
    // roomStr: '',
  }, ctx.query);

  await ctx.render('index', {
    sign: sign(),
    libs,
    query: JSON.stringify(query),
  });
});

app.listen(3000, () => {
  console.log('server start at poart 3000 ... ...');
});
