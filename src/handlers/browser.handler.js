const { app, BrowserWindow } = require('electron')

module.exports = class {
  constructor (plugin, menu, update, width, height, url) {
    this.plugin = plugin
    this.menu = menu
    this.update = update
    this.window = null
    this.width = width
    this.height = height
    this.url = url
  }

  sendWindow (identifier, message) {
    this.window.webContents.send(identifier, message)
  }

  onReady () {
    this.window = new BrowserWindow({
      width: this.width,
      height: this.height,
      frame: true,
      backgroundColor: '#FFFFFF',
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
        plugins: true
      }
    })
    this.window.loadURL(this.url)
    this.window.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => this.onBeforeSendHeaders(details, callback))
    this.sendWindow('version', app.getVersion())
    this.window.on('closed', this.onWindowClose)
    this.update.autoUpdater.checkForUpdatesAndNotify()
  }

  onBeforeSendHeaders (details, callback) {
    details.requestHeaders['X-APP'] = app.getVersion();
    callback({ requestHeaders: details.requestHeaders })
  }

  onWindowClose () {
    this.window = null
  }

  onWindowAllClosed () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  render () {
    this.plugin.render()
    this.menu.render()
    app.on('ready', () => this.onReady())
    app.on('window-all-closed', () => this.onWindowAllClosed())
    this.update.render({
      sendWindow: this.sendWindow,
    })
  }
}