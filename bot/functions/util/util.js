const sourcebin = require('sourcebin_js');
const schema = require('@schema/profile.js');

module.exports = class helper {
  static async pasteInBin(content, title) {
    try {
      const response = await sourcebin.create(
        [
          {
            name: ' ',
            content,
            languageId: 'text'
          }
        ],
        {
          title,
          description: ' '
        }
      );
      return {
        url: response.url,
        short: response.short,
        raw: `https://cdn.sourceb.in/bins/${response.key}/0`
      };
    } catch (err) {
      console.error(`pasteInBin`, err);
    }
  }
};
