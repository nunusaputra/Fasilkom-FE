import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import blank from '../../assets/img/blank.png'
import { foramterDate } from '../../utils/formaterDate'

const color = {
    "waiting": "bg-yellow-500",
    "accepted": "bg-green-500",
    "rejected": "bg-third",
}

const KaprodiKompetensiDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleAccept = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_KAPRODI}/magang-kompetensi/${id}`, {
                status: "accepted"
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/kaprodi-dashboard/magang-kompetensi')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    const handleReject = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_KAPRODI}/magang-kompetensi/${id}`, {
                status: "rejected",
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/kaprodi-dashboard/magang-kompetensi')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_KAPRODI}/magang-kompetensi/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setData(response.data.data)
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    return toast.error(message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [id, user.token])

    return (
        <div className='px-4'>
            {isLoading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <HashLoader color='#CE231C' size={50} />
                </div>
            ) : (
                <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                    <div className=''>
                        {/* Back Section */}
                        <Link to={'/kaprodi-dashboard/magang-kompetensi'}>
                            <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[18%]'>
                                <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                <h1 className='text-sm self-center'>Back to previous page</h1>
                            </div>
                        </Link>
                        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg font-bold'>Pengajuan Magang Kompetensi Information</h1>
                                <p className='text-sm text-slate-500'>You can see about submission detail here.</p>
                            </div>
                            <div className={`sm:self-center px-4 py-2 ${color[data.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                {data.status}
                            </div>
                        </div>
                    </div>

                    {/* Magang Reguler Detail */}
                    <div className='flex flex-col gap-4 mt-10'>
                        <div className='flex gap-2 lg:gap-4'>
                            <div className='w-32 h-32 rounded-lg bg-cover bg-top'
                                style={{
                                    backgroundImage: `url(${data.Mahasiswa.profile_pict === null ?
                                        blank : data.Mahasiswa.profile_pict})`
                                }}
                            />
                            <div className='flex flex-col gap-2 self-center'>
                                <h1 className='text-lg font-semibold lg:text-xl'>{data.nama} ({data.Mahasiswa.prodi})</h1>
                                <p className='text-sm text-slate-500'>{data.Mahasiswa.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <dl className="divide-y divide-gray-900">
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Full Name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {data.nama}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        NPM
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {data.npm}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Data Anggota
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {data.anggota}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nama Kompetisi
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {data.nama_kompetisi}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tanggal Masa Kompetisi
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {foramterDate(data.tanggal_kompetisi)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tingkat Kompetisi
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid capitalize">
                                            {data.tingkat_kompetisi}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Link Website / Media Sosisal Penyelenggara
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`${data.linkWeb}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {data.linkWeb}
                                            </span>
                                        </a>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Bidang Minat
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        {data.bidang_minat}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Button Action */}
                    <div className='mt-5'>
                        <div className='flex flex-col-reverse gap-2 sm:justify-start sm:flex-row-reverse'>
                            <button className='px-4 py-2 bg-secondary text-white font-semibold rounded-lg'
                                onClick={handleReject}>
                                Rejected
                            </button>
                            <button className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white'
                                onClick={handleAccept}>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default KaprodiKompetensiDetail