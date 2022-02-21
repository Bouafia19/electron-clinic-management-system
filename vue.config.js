module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      removeElectronJunk: false,
      builderOptions: {
        icon: 'src/assets/icons/clinic.png',
        productName: "medical clinic"
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
