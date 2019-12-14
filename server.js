const express = require('express')
const fs = require('fs')
const uuid = require('uuid/v4')
const gm = require('gm')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const util = require('util')
const app = express()
const port = 1337

app.use(cors())
app.use(fileUpload())

app.get('/hello', (request, response) => {
  response.send('World!')
})

// localhost:1337/resize/:width/:height
app.post('/resize/:width/:height', async (request, response) => {
  if (request.files === null) {
    return response.status(400).json({ msg: 'No file uploaded' })
  }

  const file = request.files.file
  const fileMove = util.promisify(file.mv)

  const hash = uuid()
  const { width, height } = request.params
  const { ignoreAspectRatio } = request.query
  const sourceImage = `${process.cwd()}/uploads/${hash}.${file.name}`
  const outputImage = `${process.cwd()}/uploads/tmp.${hash}.png`

  const resize = () => {
    return new Promise((resolve, reject) => {
      gm(sourceImage)
        .resize(width, height, ignoreAspectRatio ? '!' : null)
        .noProfile()
        .write(outputImage, err => {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            resolve()
          }
        })
    })
  }

  try {
    await fileMove(sourceImage)
    await resize()

    response.sendFile(outputImage)
    response.on('finish', () => {
      try {
        fs.unlinkSync(sourceImage)
        fs.unlinkSync(outputImage)
      } catch (e) {
        console.log('error removing', outputImage)
      }
    })
  } catch (err) {
    response.send(err.message)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
