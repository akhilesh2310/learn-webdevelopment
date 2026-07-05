import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const docsDir = path.join(root, 'docs');

function walk(dir) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) return [full];
    return [];
  });
}

function rel(file) {
  return path.relative(root, file);
}

function stripFrontmatter(text) {
  return text.replace(/^---[\s\S]*?---\s*/, '');
}

function normalize(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, (match) => match.replace(/\((.*?)\)/, ''))
    .replace(/[\\`*_#[\]()>|{}:;,.!?'"“”‘’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function hash(text) {
  return crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);
}

function nearestHeading(lines, lineIndex) {
  for (let i = lineIndex; i >= 0; i -= 1) {
    const match = lines[i].match(/^(#{1,6})\s+(.*)$/);
    if (match) return match[2].replace(/\*\*/g, '').trim();
  }
  return '(no heading)';
}

const files = walk(docsDir);
const docs = files.map((file) => {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  return {file: rel(file), text, lines, body: stripFrontmatter(text)};
});

const paragraphs = new Map();
const questions = new Map();
const codeBlocks = new Map();
const headings = new Map();

for (const doc of docs) {
  const blocks = doc.body.split(/\n\s*\n/);
  let cursorLine = 0;

  for (const block of blocks) {
    const firstLine = doc.text.slice(0, doc.text.indexOf(block)).split(/\r?\n/).length;
    const clean = block.trim();
    const norm = normalize(clean);
    if (norm.length >= 180 && !clean.startsWith('|')) {
      const key = hash(norm);
      if (!paragraphs.has(key)) paragraphs.set(key, {sample: clean.slice(0, 260), norm, occurrences: []});
      paragraphs.get(key).occurrences.push({
        file: doc.file,
        heading: nearestHeading(doc.lines, Math.max(0, firstLine - 1)),
      });
    }

    const questionMatches = clean.match(/(?:^|\n)\s*(?:#{1,6}\s*)?(?:\*\*)?(?:\d+\\?\.\s*)?(?:Q[:.)]\s*)?([^.\n]{8,160}\?)(?:\*\*)?/g) || [];
    for (const q of questionMatches) {
      const question = q.replace(/^#+\s*/, '').replace(/\*\*/g, '').replace(/^\s*\d+\\?\.\s*/, '').replace(/^Q[:.)]\s*/i, '').trim();
      const qNorm = normalize(question);
      if (qNorm.length >= 20) {
        if (!questions.has(qNorm)) questions.set(qNorm, {question, occurrences: []});
        questions.get(qNorm).occurrences.push({file: doc.file, heading: nearestHeading(doc.lines, cursorLine)});
      }
    }
    cursorLine += block.split(/\r?\n/).length + 1;
  }

  const codeMatches = [...doc.text.matchAll(/```([^\n`]*)\n([\s\S]*?)```/g)];
  for (const match of codeMatches) {
    const code = match[2].trim();
    const norm = code.replace(/\s+/g, ' ').trim();
    if (norm.length >= 80) {
      const key = hash(norm);
      if (!codeBlocks.has(key)) codeBlocks.set(key, {sample: code.slice(0, 260), occurrences: []});
      const line = doc.text.slice(0, match.index).split(/\r?\n/).length;
      codeBlocks.get(key).occurrences.push({
        file: doc.file,
        heading: nearestHeading(doc.lines, line - 1),
      });
    }
  }

  for (let i = 0; i < doc.lines.length; i += 1) {
    const match = doc.lines[i].match(/^(#{1,6})\s+(.*)$/);
    if (!match) continue;
    const title = match[2].replace(/\*\*/g, '').replace(/^\d+\\?\.\s*/, '').trim();
    const norm = normalize(title);
    if (norm.length >= 8) {
      if (!headings.has(norm)) headings.set(norm, {title, occurrences: []});
      headings.get(norm).occurrences.push({file: doc.file, line: i + 1});
    }
  }
}

function repeated(map, min = 2) {
  return [...map.values()]
    .filter((item) => item.occurrences.length >= min)
    .sort((a, b) => b.occurrences.length - a.occurrences.length);
}

const topics = [
  'event loop',
  'promise',
  'async await',
  'microtask',
  'macrotask',
  'closure',
  'scope',
  'hoisting',
  'this keyword',
  'call apply bind',
  'debounce',
  'throttle',
  'memoization',
  'render tree',
  'browser rendering',
  'garbage collection',
  'module',
  'error handling',
  'react memo',
  'usememo',
  'usecallback',
  'reconciliation',
  'fiber',
  'state management',
  'micro frontend',
  'next js caching',
  'jwt',
  'csrf',
  'xss',
  'cors',
  'security headers',
  'clickjacking',
  'core web vitals',
  'cdn',
  'load balancing',
  'rate limiting',
  'websocket',
  'graphql',
  'two sum',
  'sliding window',
  'sorting',
];

const topicHits = topics.map((topic) => {
  const words = topic.split(/\s+/);
  const hits = docs
    .filter((doc) => {
      const norm = normalize(doc.body);
      return words.every((word) => norm.includes(word));
    })
    .map((doc) => doc.file);
  return {topic, count: hits.length, files: hits};
}).filter((item) => item.count >= 2).sort((a, b) => b.count - a.count);

const result = {
  docsScanned: docs.length,
  repeatedParagraphClusters: repeated(paragraphs).slice(0, 80),
  repeatedQuestionClusters: repeated(questions).slice(0, 80),
  repeatedCodeClusters: repeated(codeBlocks).slice(0, 80),
  repeatedHeadingClusters: repeated(headings, 3).slice(0, 80),
  topicHits,
};

console.log(JSON.stringify(result, null, 2));
