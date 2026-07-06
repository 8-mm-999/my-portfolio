const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const token = execSync('gh auth token', { encoding: 'utf8', shell: 'cmd.exe' }).trim();
const repo = '8-mm-999/my-portfolio';
const baseUrl = `https://api.github.com/repos/${repo}`;
const h = { Authorization: `token ${token}`, 'User-Agent': 'dep', 'Content-Type': 'application/json' };

(async () => {
  const tree = [];
  async function walk(dir, prefix) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name), rel = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.isDirectory()) { await walk(full, rel); continue; }
      const buf = fs.readFileSync(full);
      const isImg = ['.png', '.jpg', '.jpeg'].includes(path.extname(e.name));
      const r = await (await fetch(`${baseUrl}/git/blobs`, { method: 'POST', headers: h,
        body: JSON.stringify(isImg ? { content: buf.toString('base64'), encoding: 'base64' }
          : { content: buf.toString('utf-8'), encoding: 'utf-8' }) })).json();
      tree.push({ path: rel, mode: '100644', type: 'blob', sha: r.sha });
    }
  }
  await walk('D:\\clean-deploy', '');
  const t = await (await fetch(`${baseUrl}/git/trees`, { method: 'POST', headers: h,
    body: JSON.stringify({ tree }) })).json();
  const c = await (await fetch(`${baseUrl}/git/commits`, { method: 'POST', headers: h,
    body: JSON.stringify({ message: 'deploy', tree: t.sha, parents: [] }) })).json();
  await fetch(`${baseUrl}/git/refs`, { method: 'POST', headers: h,
    body: JSON.stringify({ ref: 'refs/heads/gh-pages', sha: c.sha }) });
  console.log('✅ Done');
})().catch(e => console.error('❌', e.message));
