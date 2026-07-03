import pkg from 'surge';
const Surge = pkg.default || pkg;

const s = new Surge();

s.login({ email: '3179809036@qq.com', password: 'Qw12345670' })
  .then(() => s.publish({ project: 'd:\\my-portfolio', domain: 'my-portfolio-zwy.surge.sh' }))
  .then(() => console.log('✅ 成功! https://my-portfolio-zwy.surge.sh'))
  .catch(e => console.error('❌ 失败:', e.message));
