import Parser from 'web-tree-sitter';
await Parser.init();
const JavaScript = await Parser.Language.load('/tree-sitter-javascript.wasm');
const parser = new Parser;

parser.setLanguage(JavaScript);
const sourceCode = `function ((
`;
// const sourceCode = `function foo() {
//   const bar = 'baz';
// `;
const tree = parser.parse(sourceCode);
const rootNode = tree.rootNode;
const walk = (node, depth = 0) => {
  console.log('  '.repeat(depth) + node.type, `"${node.text.slice(0, 10)}"`);
  for (let i = 0; i < node.childCount; i++) {
    walk(node.child(i), depth + 1);
  }
};
walk(rootNode);

// console.log(rootNode.childCount)
// console.log(rootNode.child(0).text)
// console.log(rootNode.child(0).childCount)
// console.log(rootNode.child(0).child(0))
// console.log(rootNode.child(0).child(0).text)
// console.log(rootNode.child(0).child(0).childCount)
