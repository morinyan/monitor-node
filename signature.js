const querystring = require('querystring');
const crypto = require('crypto');

const {
  SecretId,
  secretKey
} = require('./config');

module.exports = () => {
  // 确定签名的当前时间和失效时间
  const currentTime = parseInt((new Date()).getTime() / 1000);
  const expireTime = currentTime + 60 * 60 * 24; // 签名有效期: 24小时 // 必填参数

  const arg_list = {
    CurrentTimeStamp : currentTime,
    ExpireTime : expireTime,
    Random : Math.round(Math.random() * Math.pow(2, 32)),
    SecretId,
  };

  // 计算签名
  const orignal = querystring.stringify(arg_list);
  const orignal_buffer = Buffer.from(orignal, 'utf8');

  const hmac = crypto.createHmac('sha1', secretKey);
  const hmac_buffer = hmac.update(orignal_buffer).digest();

  const sign = Buffer.concat([hmac_buffer, orignal_buffer]).toString('base64');

  return sign;
};
