const path = require('path')

module.exports = (api) => {
  api.get('/map', (req, res) => {
    res.sendFile('map.svg', { root: path.join(__dirname, 'public') })
  })
}
