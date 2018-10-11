const parser = require("./parser.js");
const req = require("reqdata");
const pageContent = {
  parseFromURL: async url => {
    const data = await req(url);
    if (!data.content) throw new Error("No valid HTML");
    return parser(data.content);
  },
  parseFromHTML: html => {
    return parser(html);
  }
};

module.exports = pageContent;
