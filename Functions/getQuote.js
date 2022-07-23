const fetch = require('cross-fetch');
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return "❝ **" + data[0]["q"] + "** ❞\n\n- " + data[0]["a"] + " -"
    })
}
module.exports = { getQuote }