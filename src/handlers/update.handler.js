const { autoUpdater } = require('electron-updater')

module.exports = class {
  constructor () {
    this.autoUpdater = autoUpdater
    this.window = null
  }

  onCheckForUpdate () {
    this.window.sendWindow('checking-for-update', '')
  }

  onUpdateAvailable () {
    this.window.sendWindow('update-available', '')
  }

  onUpdateNotAvailable () {
    this.window.sendWindow('update-not-available', '')
  }

  onError (err) {
    this.window.sendWindow('error', 'Error: ' + err)
  }

  onDownloadProgress (d) {
    this.window.sendWindow('download-progress', {
      speed: d.bytesPerSecond,
      percent: d.percent,
      transferred: d.transferred,
      total: d.total
    })
  }

  onUpdateDownloaded () {
      this.window.sendWindow('update-downloaded', 'Update downloaded')
      this.autoUpdater.quitAndInstall()
  }

  render(window) {
    this.window = window
    this.autoUpdater.on('checking-for-update', () => this.onCheckForUpdate())
    this.autoUpdater.on('update-available', () => this.onUpdateAvailable())
    this.autoUpdater.on('update-not-available', () => this.onUpdateNotAvailable())
    this.autoUpdater.on('error', (err) => this.onError(err))
    this.autoUpdater.on('download-progress', (d) => this.onDownloadProgress(d))
    this.autoUpdater.on('update-downloaded', () => this.onUpdateDownloaded())
  }
}