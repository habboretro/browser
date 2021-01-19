const { app } = require('electron')
const BrowserHandler = require('./handlers/browser.handler')
const MenuHandler = require('./handlers/menu.handler')
const UpdateHandler = require('./handlers/update.handler')
const PluginHandler = require('./handlers/plugin.handler')

const plugin = new PluginHandler()
const menu = new MenuHandler([
  {
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function () { app.quit() } }
    ]
  }, {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  }
])
const update = new UpdateHandler()
const browser = new BrowserHandler(
  plugin,
  menu,
  update,
  1280,
  720,
  `file://${__dirname}/views/index.html`
)

browser.render()