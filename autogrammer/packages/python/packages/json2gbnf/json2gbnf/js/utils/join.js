export const join = (...arr) => joinWith(' ', ...arr);
export const joinWith = (joiner, ...arr) => arr.filter(Boolean).join(joiner);
//# sourceMappingURL=join.js.map