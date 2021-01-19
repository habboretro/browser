const { Menu } = require('electron')

module.exports = class {
  constructor (template = []) {
    this.obj = null
    this.template = template
  }

  render () {
    this.obj = Menu.buildFromTemplate(this.template)
    Menu.setApplicationMenu(this.obj)
  }
}