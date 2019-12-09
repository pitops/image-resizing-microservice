import React from 'react'
import styled from 'styled-components'

export default function ProgressBar ({ percentage, active }) {
  if (!active) return null

  return (
    <ProgressBarContainer>
      <ProgressBarLine percentage={percentage} />
    </ProgressBarContainer>
  )
}

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  height: 5px;
`
const ProgressBarLine = styled.div`
  width: ${({ percentage }) => percentage || 0}%;
  background-color: red;
  height: 100%;
`
