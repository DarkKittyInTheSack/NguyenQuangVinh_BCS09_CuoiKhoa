import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'

const BusinessTemplate = () => {
  return (
    <>
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    </>
    
  )
}

export default BusinessTemplate