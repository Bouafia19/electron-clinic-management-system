'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const connectDB = require('./config/db')
const Driver = require('./models/Driver')
const Patient = require('./models/Patient')
const Vehicule = require('./models/Vehicule')
const User = require('./models/User')
const bcrypt =require('bcrypt')

// Connect to database
connectDB()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1900,
    height: 900,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  // authenticate user
  ipcMain.on('userInfo:load',async (e, item) => {
    try {
      const user = await User.findOne({ userName: item.username})

      if ( user == null) {
        win.webContents.send('userInfo:get', JSON.stringify(user))
      }
      try {
        if (await bcrypt.compare(item.password, user.password)) {
          win.webContents.send('userInfo:get', JSON.stringify(user))
        }else {
          win.webContents.send('userInfo:get', 800)

        }

      } catch (error) {
        console.log(error)
      }
      win.webContents.send('userInfo:get', JSON.stringify(userInfo))
    } catch (error) {
      console.log(error)
    }
  })

  async function createAdminUser() {
    try {
      const docCount = await User.countDocuments({}).exec();

      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash('12345678', salt)
     
      if ( docCount == 0) {
        await User.create({
          userName: 'admin',
          password: hashedPassword
        
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  createAdminUser();

  // Load drivers
  ipcMain.on('drivers:load', senddrivers)

  // Send drivers items
  async function senddrivers() {
    try {
      const drivers = await Driver.find().sort({ created: 1 })
      win.webContents.send('drivers:get', JSON.stringify(drivers))
    } catch (err) {
      console.log(err)
    }
  }

  // Add drivers
  ipcMain.on('drivers:add', async (e, item) => {
    try {
      await Driver.create(item)
      senddrivers()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete drivers
  ipcMain.on('drivers:delete', async (e, id) => {
    try {
      await Driver.findOneAndDelete({ _id: id })
      senddrivers()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit drivers
  ipcMain.on('drivers:edit', async (e, item) => {
    try {
      const doc = await Driver.findById(item._id);
      doc.firstName = item.firstName;
      doc.lastName = item.lastName;
      doc.city = item.city;
      doc.street = item.street;
      doc.state = item.state;
      doc.zip = item.zip;
      doc.country = item.country;
      doc.photo = item.photo;
      
      
      doc.mobile = item.mobile;
      doc.dateOfBirth = item.dateOfBirth;
      doc.driverLicenseNumber = item.driverLicenseNumber;
      doc.bloodGroup = item.bloodGroup;
      doc.experationDate = item.experationDate;
      await doc.save();
      senddrivers()
    } catch (error) {
      console.log(error)
    }
  })


  /////////////////////////////////
  // Load patients
  ipcMain.on('patients:load', sendPatients)

  // Send patients items
  async function sendPatients() {
    try {
      const patients = await Patient.find().sort({ created: 1 })
      win.webContents.send('patients:get', JSON.stringify(patients))
    } catch (err) {
      console.log(err)
    }
  }

  // Add patients
  ipcMain.on('patients:add', async (e, item) => {
    try {
      await Patient.create(item)
      sendPatients()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete patients
  ipcMain.on('patients:delete', async (e, id) => {
    try {
      await Patient.findOneAndDelete({ _id: id })
      sendPatients()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit patients
  ipcMain.on('patients:edit', async (e, item) => {
    try {
      const doc = await Patient.findById(item._id);
      doc.firstName = item.firstName;
      doc.lastName = item.lastName;
      doc.city = item.city;
      doc.street = item.street;
      doc.state = item.state;
      doc.zip = item.zip;
      doc.country = item.country;
      doc.photo = item.photo;
      
      
      doc.mobile = item.mobile;
      doc.dateOfBirth = item.dateOfBirth;
      doc.gender = item.gender;
      doc.bloodGroup = item.bloodGroup;
      
      await doc.save();
      sendPatients()
    } catch (error) {
      console.log(error)
    }
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
