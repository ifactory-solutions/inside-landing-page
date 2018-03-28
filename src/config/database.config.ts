import * as mongoose from 'mongoose'

export class DatabaseConfig {
  public static URI: string = process.env.MONGODB_URI || "mongodb://mongo:27017/local"

  public static connect() {
    mongoose.connect(this.URI)
    this.init()
  }

  private static init() {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open to ' + DatabaseConfig.URI)
    })

    mongoose.connection.on('error', (err) => {
      console.log('Mongoose default connection error: ' + err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected')
    })

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination')
      })
    })
  }

  public static disconnect() {
    mongoose.disconnect()
  }
}