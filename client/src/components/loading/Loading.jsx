import React from 'react'
import Alert from '@mui/material/Alert';

const Loading = ({type}) => {
  return (
    <>
    <Alert severity="info">{type}!</Alert>
    </>
  )
}

export default Loading;
