import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import MitraCreateNilai from '../../pages/MitraDashboard/MitraCreateNilai'


const MitraCreateNilaiLayouts = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user && user.role !== "mitra") {
            navigate('/forbidden')
        }
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [user, navigate, isLoading])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <DrawerMobile />
                    <main className='w-full min-h-screen flex flex-row relative'>
                        <div className='hidden sm:block'>
                            <Drawer />
                        </div>
                        <section className='sm:ml-20 p-10 w-full'>
                            <MitraCreateNilai />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default MitraCreateNilaiLayouts
