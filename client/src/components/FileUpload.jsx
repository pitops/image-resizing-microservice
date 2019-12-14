import React, { useState } from 'react'
import {
  FileUploadContainer,
  FileUploadForm,
  FileUploadButton,
  FileUploadParametersContainer
} from './FileUpload.styled'
import ProgressBar from './ProgressBar'
import axios from 'axios'

export default function FileUpload () {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [message, setMessage] = useState('Start resize')
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(500)
  const [ignoreAspectRatio, setIgnoreAspectRatio] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)

  const downloadImage = data => {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'resizedImage.png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const onChange = e => {
    setFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  }

  const onUploadFile = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)

    try {
      setShowProgressBar(true)
      setMessage('Uploading!')
      const res = await axios.post(
        `http://localhost:1337/resize/${width}/${height}?ignoreAspectRatio=${ignoreAspectRatio}`,
        formData,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            const progress = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
            setMessage(`${progress}%`)
            setUploadPercentage(progress)
          }
        }
      )

      downloadImage(res.data)

      setMessage('Resized!')
      setShowProgressBar(false)

      setTimeout(() => {
        resetForm()
      }, 10000)
    } catch (err) {
      setShowProgressBar(false)
      if (err.response.status === 500) {
        setMessage('There was a problem with the server')
      } else {
        setMessage(err.response.data.msg)
      }
    }
  }

  const resetForm = () => {
    setFilename('Choose File')
    setMessage('Start resize')
    setUploadPercentage(0)
    setWidth(0)
    setHeight(0)
    setIgnoreAspectRatio(false)
  }

  return (
    <FileUploadContainer>
      <FileUploadForm>
        {filename !== 'Choose File' && (
          <label className='file-input-label' htmlFor='fileInput'>
            {filename}
          </label>
        )}
        <input
          type='file'
          className='file-input'
          id='fileInput'
          onChange={onChange}
        />
        <FileUploadParametersContainer>
          <p>Parameters</p>
          <label htmlFor='width'>
            Width
            <input
              type='number'
              name='width'
              id='width'
              value={width}
              onChange={e => setWidth(e.target.value)}
            />
            px
          </label>
          <label htmlFor='height'>
            Height
            <input
              type='number'
              name='height'
              id='height'
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
            px
          </label>
          <label htmlFor='ignoreAspectRatio'>
            Ignore aspect ratio
            <input
              type='checkbox'
              name='ignoreAspectRatio'
              id='ignoreAspectRatio'
              checked={ignoreAspectRatio}
              onChange={e => setIgnoreAspectRatio(e.target.checked)}
            />
          </label>
        </FileUploadParametersContainer>
      </FileUploadForm>

      <FileUploadButton
        disabled={showProgressBar || filename === 'Choose File'}
        onClick={onUploadFile}
      >
        {message}{' '}
        <ProgressBar active={showProgressBar} percentage={uploadPercentage} />
      </FileUploadButton>
    </FileUploadContainer>
  )
}
