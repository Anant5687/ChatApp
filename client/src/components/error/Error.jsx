import React from 'react'
import Alert from '@mui/material/Alert';

const Error = ({ type }) => {
    return (
        <>
            <Alert severity="error">{type}!</Alert>
        </>
    )
}

export default Error
