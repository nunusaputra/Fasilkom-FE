import React, { useEffect, useState } from 'react'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import LogbookCompany from '../../pages/TimMagangDashboard/LogbookCompany'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'

const LogbookCompanyLayouts = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user && user.role !== "tim-magang") {
      navigate('/forbidden')
    }
  }, [user])

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
    })
  }, [isLoading])
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DrawerMobile />
          <main className='w-full min-h-screen'>
            <div className='hidden sm:block'>
              <Drawer />
            </div>
            <section className='sm:ml-20 sm:p-10'>
              <LogbookCompany />
            </section>
          </main>
        </>
      )}
    </div>
  )
}

export default LogbookCompanyLayouts