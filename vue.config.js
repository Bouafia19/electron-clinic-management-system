module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      removeElectronJunk: false,
      builderOptions: {
        icon: 'src/assets/icons/couleur/clinic.png',
        productName: "medical clinic",
        appId: 'https://nextchallenge-dz.com/',
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
