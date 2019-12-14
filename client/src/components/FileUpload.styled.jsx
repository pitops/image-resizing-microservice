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
  /* justify-content: center; */
  margin: 0 auto;
  min-width: 200px;
  flex-direction: column;
  align-items: center;

  label {
    font-weight: 300;
    margin-right: 15px;
  }

  input[type='file'] {
    width: 80px;
  }

  input[type='number'] {
    padding: 5px;
    border-radius: 5px;
    width: 40px;
    border: 1px solid #efefef;
    margin-left: 5px;
  }
`

export const FileUploadParametersContainer = styled.div`
  display: flex;
  flex-direction: column;

  label:not(:first-of-type) {
    margin-top: 10px;
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
