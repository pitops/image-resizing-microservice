const express = require('express')
const fs = require('fs')
const uuid = require('uuid/v4')
const gm = require('gm')
const app = express()
const port = 1337

app.get('/hello', (request, response) => {
  response.send('World!')
})

// localhost:1337/resize/:width/:height
app.get('/resize/:width/:height', async (request, response) => {
  const hash = uuid()
  const { width, height } = request.params
  const image = `${process.cwd()}/thumbnail.png`
  const outputImage = `${process.cwd()}/tmp.${hash}.png`
  const { aspectRatio } = request.query

  const resize = () => {
    return new Promise((resolve, reject) => {
      gm(image)
        .resize(
          width,
          height,
          aspectRatio && aspectRatio === 'ignore' ? '!' : null
        )
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
    await resize()
    response.sendFile(outputImage)
    response.on('finish', () => {
      try {
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
