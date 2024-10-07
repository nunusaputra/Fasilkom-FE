import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tables from '../../components/Tables'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound'
import Pagination from '../../components/Pagination'
import { getRegulerMhs } from '../../redux/Action/PengajuanAction'
import { color } from '../../assets/data/color'
import { foramterDate } from '../../utils/formaterDate'

const MagangReguler = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const { Loading, pengajuan } = useSelector(state => state.pengajuan)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = Array.isArray(pengajuan) ? pengajuan.slice(firstPostIndex, lastPostIndex) : [];
    useEffect(() => {
        dispatch(getRegulerMhs(user.token))
    }, [dispatch])

    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-6 py-8'>
                <div className='flex flex-col gap-4 md:flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-lg font-bold'>Pengajuan Magang Reguler</h1>
                        <p className='text-sm text-slate-500'>Kamu dapat melihat status pengajuan magang kamu disini.</p>
                    </div>
                    <a href="/dashboard/create-reguler">
                        <button className='bg-secondary text-white text-sm font-semibold px-4 py-2 rounded-lg'>Buat Permohonan</button>
                    </a>
                </div>
                {/* Table Section */}
                <div className='mt-10'>
                    <Tables>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NPM</th>
                                <th>Program Studi</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Loading ? (
                                <tr className=''>
                                    <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <HashLoader color='#ce231c' />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentPost.length > 0 ? (
                                    currentPost.filter(item => (
                                        search.toLowerCase() === "" ? item : item.nama.toLowerCase().includes(search.toLowerCase())
                                    )).length > 0 ? (
                                        currentPost.filter(item => (
                                            search.toLowerCase() === "" ? item : item.nama.toLowerCase().includes(search.toLowerCase())
                                        )).map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                                    alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{item.nama}</div>
                                                            <div className="text-sm opacity-50">{item.Mahasiswa.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.npm}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`px-4 py-2 rounded-lg font-bold text-white ${item.Mahasiswa.prodi === "Informatika" ? 'bg-blue-500' : 'bg-orange-500'}`}
                                                    >
                                                        {item.Mahasiswa.prodi}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`px-4 py-2 ${color[item.status]} rounded-lg text-white font-bold`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>{foramterDate(item.createdAt)}</td>
                                                <th className=''>
                                                    <Link to={`/dashboard/magang-reguler/${item.id}`}>
                                                        <button className='px-4 py-2 rounded-md border border-black cursor-pointer hover:bg-black hover:text-white'>
                                                            Detail
                                                        </button>
                                                    </Link>
                                                </th>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className=''>
                                            <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <DataNotFound>
                                                        Your search result not found
                                                    </DataNotFound>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr className=''>
                                        <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <DataNotFound>
                                                    Tidak ada pengajuan magang reguler
                                                </DataNotFound>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Tables>
                    {!Loading && (
                        <Pagination
                            postPerPage={postPerPage}
                            totalPost={pengajuan && pengajuan.length}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MagangReguler
