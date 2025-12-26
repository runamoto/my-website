import fs from 'fs'
import markdownIt from "./markdown-it/markdown-it.js";

let md = new markdownIt('commonmark')//.use(makrdownItMark);

let attrs = (item) => {
	let attrs = item.attrs;
	if (!attrs) return {};
	return Object.fromEntries(attrs);
};

let attrsToString = at => 
				Object.entries(at)
					.map(([key, value]) => `${key} = "${value}"`)
					.join(" ");

let beforeElementHooks = []
let hookMap = {}


function eat(tree) {
	let ret = [];
	if (!tree) return "";
	while (tree.length > 0) {
		let item = tree.shift();
		if (item.nesting === 1) {
			let at = attrs(item);
			let ignore = false;

			if (at.href) {
				// check if href is md
				let href = at.href
				let split = href.split('.')
				let ext = split.pop()
				if (ext == 'md') at.href = split.join('.') + '.html'
				if (ext == 'js.html') at.href = split.join('.') + '.html'
			}

			let at_string = attrsToString(at)

			if (!ignore) {
				let children =  eat(tree);
				children = Array.isArray(children) ? children.join("") : children;
				let done = false
				for (let i = 0; i < beforeElementHooks.length; i++) {
					if (done) continue
					if (beforeElementHooks[i].condition(item, children)) {
						let el = beforeElementHooks[i].element(item, children)
						ret.push(el)
						done = true
					}
				}

				if (!done) ret.push(`<${item.tag}${at_string ? " " + at_string : ''}> ${children} </${item.tag}>`);

			}
		}

		if (item.nesting === 0) {
			if (!item.children || item.children.length === 0) {
				let p = item.type === "softbreak"
					? "<br></br>"
					: item.type === "fence"
						? codeblock(item)
						: item.content;
				ret.push(p);
			} else {
				let children =  eat(item.children);
				children = Array.isArray(children) ? children.join("") : children;
				ret.push(children);
			}
		}

		if (item.nesting === -1) break;
	}
	return ret;
}




let codeblock = (item) => {
    return `<pre>${item.content}</pre>`
}

let safe_parse = (content) => {
	try {
		return md.parse(content, { html: true });
	} catch (e) {
		return undefined;
	}
};

const MD =  (content) => {
	let tree, body;
	tree = safe_parse(content);

	if (tree) body =  eat(tree);
	else body = content;

	return body;
};

let html = body => `
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="./blog.css">
</head> 
<body>
	${body}
</body>
</html>`

let transform =  (path) => {
    let filename = "./blogposts/" + path
	let file = fs.readFileSync(filename, { encoding: 'utf-8' })
	let content =  MD(file);
	let split = filename.split('.')
	let ext = split.pop()
	let htmlpath = split.join(".") + '.html'
	fs.writeFileSync(htmlpath, html(content.join("\n")))
}

let files = fs.readdirSync('./blogposts', { recursive: true })
files.forEach(path => {
	if (path.includes('.git')) return
	// emacs pain...
	if (path.includes('#')) return
	if (path.includes('markdown-it')) return

	
	let split = path.split('.')
	let ext = split.pop()
	if (ext == 'md') transform(path)

	console.log(path)
})
