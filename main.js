const {app, Menu, BrowserWindow, ipcMain, session, shell, dialog} = require('electron')

const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        icon: path.join(__dirname, "./assets/background.ico"),
        name: '慧言AI稳定节点',
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
                }
            ]
        },
        {
            label: '站点选择',
            submenu: [
                {
                    label: '新建快速窗口',
                    click: () => {
                        let win = new BrowserWindow({width: 1200, height: 900})
                        win.loadURL('https://chat.huiyan-ai.com')
                        win.setTitle('慧言AI快速节点')
                    }
                }, {
                    label: '新建稳定窗口',
                    click: () => {
                        let win = new BrowserWindow({width: 1200, height: 900})
                        win.loadURL('https://onechat.huiyan-ai.com')
                        win.setTitle('慧言AI稳定节点')
                    }
                }
            ]
        },
        {
            label: "编辑",
            submenu: [
                {role: 'undo', label: '撤销'},
                {role: 'redo', label: '重做'},
                {type: 'separator'},
                {role: 'cut', label: '剪切'},
                {role: 'copy', label: '复制'},
                {role: 'paste', label: '粘贴'},
                {role: 'delete', label: '删除'},
                {role: 'selectAll', label: '全选'}
            ]
        },
        {
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
                    click: () => {
                        let modal = new BrowserWindow({modal: true, show: false})
                        modal.loadURL("https://www.huiyan-ai.com/qun.html")
                        modal.setMenu(null)
                        modal.once('ready-to-show', () => {
                            modal.show()
                        })
                    }
                },
                {type: 'separator'},
                {
                    label: '版本号：0.5.6',
                    click: async () => {
                        await shell.openExternal('https://alist.huiyan-ai.com/final/huiyan')
                    }
                },
                {
                    label: '点击更新-获得最佳体验',
                    click: async () => {
                        await shell.openExternal('https://alist.huiyan-ai.com/final/huiyan')
                    }
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
