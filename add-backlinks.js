import fs from 'fs'
import path from 'path'

const dir = './words'
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'))

files.forEach(file => {
const p = path.join(dir, file)
let content = fs.readFileSync(p, 'utf8')
  // skip if backlink already present
if (/class=["']backlink["']|href=["']\.\./i.test(content)) {
    console.log('Skipping (already has backlink):', file)
    return
}

const backlink = `\n    <p class="backlink"><a href="../blog.html">← Back to Blog</a></p>\n`;

if (/<\/body>/i.test(content)) {
    content = content.replace(/<\/body>/i, backlink + '</body>')
} else {
    content = content + '\n' + backlink
}

fs.writeFileSync(p, content, 'utf8')
console.log('Inserted backlink into', file)
})

console.log('Done')
