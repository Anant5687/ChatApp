import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const useFetch = (url) => {
    const [apiData, setApiData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            axios.post(url).then((response) => {
                setApiData(response.data)
                setError(false)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setError(true)
                setLoading(false)
            })
        }
        fetchData()
    }, [url])
    return { loading, apiData, error }
}

export default useFetch
