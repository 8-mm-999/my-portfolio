const surge = require('surge');
const s = surge({
  project: 'd:\\my-portfolio',
  domain: 'my-portfolio-zwy.surge.sh',
  endpoint: 'https://surge.surge.sh',
  login: '3179809036@qq.com',
  password: 'Qw12345670'
});
s.publish().then(() => {
  console.log('Deployed to https://my-portfolio-zwy.surge.sh');
}).catch(e => {
  console.error('Failed:', e.message);
});
