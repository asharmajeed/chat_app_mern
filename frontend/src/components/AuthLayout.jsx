import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const [status, setStatus] = useState(false)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [user])

  useEffect(() => {
    if (authentication && status !== authentication) {
      navigate('/login')
    } else if (!authentication && status !== authentication) {
      navigate('/')
    }
    setLoader(false)
  }, [authentication, status, navigate])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}