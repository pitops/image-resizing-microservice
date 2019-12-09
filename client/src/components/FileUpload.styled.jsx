import styled from 'styled-components'

export const FileUploadContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
`

export const FileUploadForm = styled.form`
  background-color: #dadada;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  min-width: 200px;

  label {
    font-weight: 300;
    margin-right: 15px;
  }

  input {
    width: 80px;
  }
`

export const FileUploadButton = styled.button`
  position: relative;
  padding: 10px 20px;
  width: 150px;
  border-radius: 5px;
  background-color: #2196f3;
  box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.3);
  border: none;
  color: #ffffff;
  font-size: 16px;
  text-transform: uppercase;
  margin: 10px auto 0 auto;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
