export const getID = (i) => ((i >= 26 ? getID(((i / 26) >> 0) - 1) : "") +
    "abcdefghijklmnopqrstuvwxyz"[i % 26 >> 0]);
//# sourceMappingURL=get-id.js.map