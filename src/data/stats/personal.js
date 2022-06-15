import React, { useState, useEffect } from 'react'

const Age = () => {
  const [age, setAge] = useState()

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.2421897 // ms in an average year
    const birthTime = new Date('1997-06-04T01:30:00')
    setAge(((Date.now() - birthTime) / divisor).toFixed(11))
  }

  useEffect(() => {
    const timer = setInterval(() => tick(), 25)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <>{age}</>
}

const data = [
  {
    key: 'age',
    label: 'Current age',
    value: <Age />,
  },
  {
    key: 'countries',
    label: 'Countries visited',
    value: 2,
    link: 'https://www.google.com/maps/d/u/0/edit?mid=1si-w3mvccAfB8ZgPHLDwyeGdqwn_Bk0&ll=18.621255364806863%2C75.44494943130869&z=5',
  },
  {
    key: 'location',
    label: 'Current city',
    value: 'New Jersey, NJ',
  },
]

export default data
