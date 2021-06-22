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
  const params = {
    sdkappid: ctx.query.sdkappid,
    roomid: ctx.query.roomid,
    userid: ctx.query.userid
  };
  await ctx.render('index', {
    sign: sign(),
    libs,
    params
  });
});

app.listen(3000, () => {
  console.log('server start at poart 3000 ... ...');
});
