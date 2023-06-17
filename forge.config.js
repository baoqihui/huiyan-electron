const path = require('path')
// const path = require('path');

module.exports = {
  makers: [ 
      // {
      //     name: '@electron-forge/maker-wix',
      //     config: {
      //         description: 'huiyanAI client',
      //       //   language: 1042,
      //
      //         manufacturer: 'huiyan ai',
      //         name: 'huiyan',
      //         ui: {
      //             chooseDirectory: true
      //         }
      //     }
      // }, 
      // {
      //   name: '@electron-forge/maker-squirrel',
      //   config: {
      //     name: 'huiyanAI'
      //   }
      // },
      // {
      //   name: '@electron-forge/maker-zip',
      //   platforms: ['darwin']
      // },
      // {
      //   name: '@electron-forge/maker-deb',
      //   config: {}
      // },
      // {
      //   name: '@electron-forge/maker-rpm',
      //   config: {}
      // },
      {
        name: '@electron-forge/maker-dmg',
        config: {
          // 配置选项（可选），例如：icon, background, format等
          icon: path.join(__dirname, 'assets', 'background.icns'),
          name: 'WiseTalk',
          // icon: 'assets/background.icns',
          format: 'ULFO'
        }
      }
  ],
  packagerConfig: {
    author: '慧言AI',
    icon: path.join(__dirname, 'assets', 'background.ico'),
    name: '慧言AI',
    dmgFileName: '慧言AI',
    description: 'www.huiyan-ai.com',
  },
}







 