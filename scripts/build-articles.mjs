import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const templatePath = join(root, "writings/_article-template.html");
const template = await readFile(templatePath, "utf8");

const articles = [
  {
    source: "writings/tangent-animation/index.html",
    content: "writings/_content/tangent-animation.html",
    output: "writings/tangent-animation/index.html",
  },
  {
    source: "writings/metamathematics-concept-list/index.html",
    content: "writings/_content/metamathematics-concept-list.html",
    output: "writings/metamathematics-concept-list/index.html",
  },
  {
    source: "writings/von-neumann-ordinals/index.html",
    content: "writings/_content/von-neumann-ordinals.html",
    output: "writings/von-neumann-ordinals/index.html",
  },
  {
    source: "writings/sum-of-n-natural-numbers/index.html",
    content: "writings/_content/sum-of-n-natural-numbers.html",
    output: "writings/sum-of-n-natural-numbers/index.html",
  },
  {
    source: "writings/theorem-prover-overview/index.html",
    content: "writings/_content/theorem-prover-overview.html",
    output: "writings/theorem-prover-overview/index.html",
  },
  {
    source: "writings/terraformer-for-dummies/index.html",
    content: "writings/_content/terraformer-for-dummies.html",
    output: "writings/terraformer-for-dummies/index.html",
  },
  {
    source: "writings/terraformer-research-project/index.html",
    content: "writings/_content/terraformer-research-project.html",
    output: "writings/terraformer-research-project/index.html",
  },
  {
    source: "writings/gt-off-road/index.html",
    content: "writings/_content/gt-off-road.html",
    output: "writings/gt-off-road/index.html",
  },
];

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : "Arihant Gadgade";
}

function extractHeadExtras(html) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!match) return "";
  let head = match[1];
  head = head.replace(/<!--[\s\S]*?-->\s*/g, "");
  head = head.replace(/<meta[^>]*charset[^>]*>\s*/i, "");
  head = head.replace(/<meta[^>]*name="viewport"[^>]*>\s*/i, "");
  head = head.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
  head = head.replace(/<link[^>]*href="(?:\.\.\/)*assets\/styles\.css"[^>]*>\s*/gi, "");
  head = head.replace(/<link[^>]*href="(?:\.\.\/)*assets\/css\/site\.css"[^>]*>\s*/gi, "");
  return head.trim() ? `${head.trim()}\n` : "";
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) {
    throw new Error("Could not find <body> in source HTML");
  }
  return match[1].trim();
}

for (const article of articles) {
  const sourcePath = join(root, article.source);
  const contentPath = join(root, article.content);
  const contentExists = await readFile(contentPath, "utf8").then(
    () => true,
    () => false,
  );

  const sourceHtml = await readFile(sourcePath, "utf8");
  const title = extractTitle(sourceHtml);
  const extras = extractHeadExtras(sourceHtml);
  const body = contentExists ? await readFile(contentPath, "utf8") : extractBody(sourceHtml);

  await mkdir(dirname(contentPath), { recursive: true });
  if (!contentExists) {
    await writeFile(contentPath, `${body}\n`);
  }

  const rendered = template
    .replace("{{TITLE}}", title)
    .replace("{{EXTRA_HEAD}}", extras ? `    ${extras.replace(/\n/g, "\n    ")}` : "")
    .replace("{{CONTENT}}", body.split("\n").map((line) => `        ${line}`).join("\n"));

  await writeFile(join(root, article.output), `${rendered}\n`);
}
