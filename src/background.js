'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const connectDB = require('./config/db')
const Driver = require('./models/Driver')
const Patient = require('./models/Patient')
const Vehicle = require('./models/Vehicle')
const User = require('./models/User')
const Mission = require('./models/Mission')
const Ride = require('./models/Ride')
const Station = require('./models/Station')
const Schedule = require('./models/Schedule')
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
    win.setMenu(null)
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

  // Load vehicles
  ipcMain.on('vehicles:load', sendVehicles)

  // Send vehicles items
  async function sendVehicles() {
    try {
      const vehicles = await Vehicle.find().sort({ created: 1 }).populate("driverId")
      win.webContents.send('vehicles:get', JSON.stringify(vehicles))
    } catch (err) {
      console.log(err)
    }
  }

  // Add vehicles
  ipcMain.on('vehicles:add', async (e, item) => {
    try {
      await Vehicle.create(item)
      sendVehicles()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete vehicles
  ipcMain.on('vehicles:delete', async (e, id) => {
    try {
      await Vehicle.findOneAndDelete({ _id: id })
      sendVehicles()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit vehicles
  ipcMain.on('vehicles:edit', async (e, item) => {
    try {
      const doc = await Vehicle.findById(item._id);
      doc.model = item.model;
      doc.licensePlate = item.licensePlate;
      doc.driverId = item.driverId;
      doc.assignmentDate = item.assignmentDate;
      doc.chassisNumber = item.chassisNumber;
      doc.odometer = item.odometer;
      doc.photo = item.photo;
  
      await doc.save();
      sendVehicles()
    } catch (error) {
      console.log(error)
    }
  })

  // Load missions
  ipcMain.on('missions:load', sendMissions)

  // Send missions items
  async function sendMissions() {
    try {
      const missions = await Mission.find().sort({ created: 1 }).populate("driverId").populate("vehiculeId")
      win.webContents.send('missions:get', JSON.stringify(missions))
    } catch (err) {
      console.log(err)
    }
  }

  // Add missions
  ipcMain.on('missions:add', async (e, item) => {
    try {
      await Mission.create(item)
      sendMissions()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete missions
  ipcMain.on('missions:delete', async (e, id) => {
    try {
      await Mission.findOneAndDelete({ _id: id })
      sendMissions()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit missions
  ipcMain.on('missions:edit', async (e, item) => {
    try {
      const doc = await Mission.findById(item._id);
      // doc.firstName = item.firstName;
      // doc.lastName = item.lastName;
      // doc.city = item.city;
      // doc.street = item.street;
      // doc.state = item.state;
      // doc.zip = item.zip;
      // doc.country = item.country;
      // doc.photo = item.photo;
      
      
      // doc.mobile = item.mobile;
      // doc.dateOfBirth = item.dateOfBirth;
      // doc.driverLicenseNumber = item.driverLicenseNumber;
      // doc.bloodGroup = item.bloodGroup;
      // doc.experationDate = item.experationDate;
      await doc.save();
      sendMissions()
    } catch (error) {
      console.log(error)
    }
  })

  // Load Mission Information
  ipcMain.on('missionInfo:load',async (e, id) => {
    try {
      const missionInfo = await Mission.findOne({ _id: id}).populate("driverId").populate("vehiculeId")
      win.webContents.send('missionInfo:get', JSON.stringify(missionInfo))
    } catch (error) {
      console.log(error)
    }
  })

  // Edit missionInfo
  ipcMain.on('missionInfo:edit', async (e, item) => {
    try {
      const doc = await Mission.findOne({ _id: item._id });
      doc.vehiculeId = item.vehiculeId;
      doc.driverId = item.driverId;
      doc.date = item.date;
      doc.confirmed = item.confirmed;
      doc.totalDistances = item.totalDistances;
      doc.totalHours = item.totalHours;

      await doc.save();
      sendMissions()
    } catch (error) {
      console.log(error)
    }
  })


  // Load rides
  ipcMain.on('rides:load',async (e, id) => {
    try {
      const rides = await Ride.find({ missionId: id}).populate("patientId").populate("stationId")
      win.webContents.send('rides:get', JSON.stringify(rides))
    } catch (error) {
      console.log(error)
    }
  })

  // Send rides
  async function sendRides(id) {
    try {
      const rides = await Ride.find({ missionId: id}).populate("patientId").populate("stationId")
      win.webContents.send('rides:get', JSON.stringify(rides))
    } catch (err) {
      console.log(err)
    }
  }

   // Add rides
   ipcMain.on('rides:add', async (e, item) => {
     try {
       await Ride.create(item)
       sendRides(item.missionId)
     } catch (error) {
       console.log(error)
     }
   })
 
   // Delete rides
   ipcMain.on('rides:delete', async (e, item) => {
     try {
       await Ride.findOneAndDelete({ _id: item._id })
       sendRides(item.missionId)
     } catch (error) {
       console.log(error)
     }
   })
 
   // Edit rides
   ipcMain.on('rides:edit', async (e, item) => {
     try {
       const doc = await Ride.findById(item._id);
       doc.patientId = item.patientId;
       doc.stationId = item.stationId;
       doc.departureTime = item.departureTime;
       doc.arrivingTime = item.arrivingTime;
       doc.departureCounter = item.departureCounter;
       doc.arrivalCounter = item.arrivalCounter;
       await doc.save();
       sendRides(item._id)
     } catch (error) {
       console.log(error)
     }
   })

   // Load stations
  ipcMain.on('stations:load', sendStations)

  // Send stations items
  async function sendStations() {
    try {
      const stations = await Station.find().sort({ created: 1 })
      win.webContents.send('stations:get', JSON.stringify(stations))
    } catch (err) {
      console.log(err)
    }
  }

  // Add stations
  ipcMain.on('stations:add', async (e, item) => {
    try {
      await Station.create(item)
      sendStations()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete stations
  ipcMain.on('stations:delete', async (e, id) => {
    try {
      await Station.findOneAndDelete({ _id: id })
      sendStations()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit stations
  ipcMain.on('stations:edit', async (e, item) => {
    try {
      const doc = await Station.findById(item._id);
      doc.name = item.name;
      await doc.save();
      sendStations()
    } catch (error) {
      console.log(error)
    }
  })

   // Load schedule
  ipcMain.on('schedule:load', sendschedule)

  // Send schedule items
  async function sendschedule() {
    try {
      const schedule = await Schedule.find().sort({ created: 1 }).populate("patientId").populate("driverId")
      win.webContents.send('schedule:get', JSON.stringify(schedule))
    } catch (err) {
      console.log(err)
    }
  }

  // Add schedule
  ipcMain.on('schedule:add', async (e, item) => {
    try {
      await Schedule.create(item)
      sendschedule()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete schedule
  ipcMain.on('schedule:delete', async (e, id) => {
    try {
      await Schedule.findOneAndDelete({ _id: id })
      sendschedule()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit schedule
  ipcMain.on('schedule:edit', async (e, item) => {
    try {
      const doc = await Schedule.findById(item._id);
      doc.patientId = item.patientId;
      doc.driverId = item.driverId;
      doc.period = item.period;
      doc.name = item.name;
      doc.start = item.start;
      doc.end = item.end;
      doc.color = item.color;
      doc.timed = item.timed;
      await doc.save();
      sendschedule()
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
