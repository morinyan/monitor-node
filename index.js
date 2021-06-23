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
  const startTime = parseInt((new Date().setHours(0,0,0) - 13 * 24 * 60 * 60 * 1000) / 1000);
  const endTime = parseInt((new Date().setHours(23, 59, 59)) / 1000);

  const query = Object.assign({
    // sdkAppId: 1400435271,
    startTime: startTime,
    endTime: endTime,
    // roomNum: '',
    // userId: '',
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
