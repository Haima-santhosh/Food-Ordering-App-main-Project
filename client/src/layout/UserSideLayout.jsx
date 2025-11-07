import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const UserSideLayout = () => {
  return (
   <>
   <Header />
   <main>
    <Outlet />
   </main>
   <Footer />
   </>
  )
}

export default UserSideLayout