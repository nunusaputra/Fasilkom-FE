import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import DospemBimbingan from '../../pages/DospemDashboard/DospemBimbingan'
import DospemUpdateNilai from '../../pages/DospemDashboard/DospemUpdateNilai'
import { getNilaiId } from '../../redux/Action/NilaiAction'

const DospemUpdateNilaiLayouts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(true)

    const data = {
        id,
        token: user.token
    }

    useEffect(() => {
        if (user && user.role !== "dospem") {
            navigate('/forbidden')
        }
        dispatch(getNilaiId(data))
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading, user, navigate, dispatch])
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
                            <DospemUpdateNilai />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default DospemUpdateNilaiLayouts
