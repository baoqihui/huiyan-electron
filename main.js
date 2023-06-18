const {app, Menu, BrowserWindow, ipcMain, session, shell} = require('electron')

const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        icon: path.join(__dirname, "./assets/background.ico"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    const menuTemplate = [
        {
            label: '操作',
            submenu: [
                {
                    label: '清除缓存',
                    click: async () => {
                        console.log('start clear cache')
                        session.defaultSession.clearCache().then(() => {
                        }).catch((error) => {
                        })

                        session.defaultSession.clearStorageData({
                            storages: ['cookies', 'filesystem', 'indexdb', 'websql', 'shadercache', 'localstorage', 'serviceworkers', 'cachestorage']
                        }).then(() => {
                        }).catch((error) => {
                        })

                        win.webContents.session.clearCache().then(() => {
                            win.reload()
                        }).catch(error => {
                        })
                    }
                },
            ]
        }, {
            label: '关于',
            submenu: [
                {
                    label: '慧言官网',
                    click: async () => {
                        await shell.openExternal('https://www.huiyan-ai.com')
                    }
                },
                {
                    label: '联系我们',
                    click: async () => {
                        await shell.openExternal('https://www.huiyan-ai.com/qun.html')
                    }
                },
                {
                    label: '版本号：0.5.5'
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
    win.loadURL(`https://onechat.huiyan-ai.com/`)
    // win.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
