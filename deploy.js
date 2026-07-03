const { spawn } = require('child_process');
const path = require('path');

const surge = spawn('npx', ['surge', '--domain', 'my-portfolio-zwy.surge.sh'], {
  shell: true,
  cwd: 'd:\\my-portfolio',
  stdio: ['pipe', 'inherit', 'inherit']
});

// Wait a bit then send email + password
setTimeout(() => {
  surge.stdin.write('3179809036@qq.com\n');
}, 1000);

setTimeout(() => {
  surge.stdin.write('Qw12345670\n');
}, 2000);

surge.on('close', (code) => {
  console.log(`\nDeploy complete (exit code: ${code})`);
});

// Timeout after 30s
setTimeout(() => {
  surge.kill();
  console.log('Timeout - killing process');
}, 30000);
