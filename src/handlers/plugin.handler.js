const { app } = require('electron')
const path = require('path')

module.exports = class {
  constructor () {
    this.plugins = {
      flash: {
        name: 'win/x32/pepflashplayer.dll',
        version: '32.0.0.363',
      }
    }
  }

  renderFlash () {
    let foo
    switch (process.platform) {
      case 'darwin':
        this.plugins.flash.name = 'osx/PepperFlashPlayer.plugin'
        break
      default:
        if (process.arch === 'x64' || process.arch === 'arm64') this.plugins.flash.name = 'win/x64/pepflashplayer.dll'
        break
    }

    app.commandLine.appendSwitch('disable-renderer-backgrounding')
    if (process.platform !== 'darwin') {
      app.commandLine.appendSwitch('high-dpi-support', '1')
      app.commandLine.appendSwitch('force-device-scale-factor', '1')
    }
    app.commandLine.appendSwitch('--enable-npapi')
    app.commandLine.appendSwitch('--ppapi-flash-path', path.join(__dirname.includes('.asar') ? process.resourcesPath : __dirname, '../plugins/flash/' + this.plugins.flash.name))
    app.commandLine.appendSwitch('--ppapi-flash-version', this.plugins.flash.version)
    app.commandLine.appendSwitch('disable-site-isolation-trials')
    app.commandLine.appendSwitch('no-sandbox')
  }

  render () {
    this.renderFlash()
  }
}