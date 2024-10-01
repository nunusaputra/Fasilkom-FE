import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoSearchOutline } from 'react-icons/io5'
import Tables from '../../components/Tables'
import { HashLoader } from 'react-spinners'
import { foramterDate } from '../../utils/formaterDate'
import { Link } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound'
import Pagination from '../../components/Pagination'
import { getBobotMitra } from '../../redux/Action/NilaiAction'

const MitraNilai = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { isLoading, nilai } = useSelector(state => state.nilai)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = Array.isArray(nilai) ? nilai.slice(firstPostIndex, lastPostIndex) : [];

    useEffect(() => {
        dispatch(getBobotMitra(user.token))
    }, [dispatch])

    return (
        <div className='px-4'>
            <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
                <div className='flex justify-between gap-2'>
                    <div className=''>
                        <h1 className='text-lg font-semibold'>Nilai Mahasiswa Magang</h1>
                        <p className='text-xs sm:text-sm'>You can see all student internship report here.</p>
                    </div>
                    <Link to={"/mitra-dashboard/create-nilai"}>
                        <button className='bg-secondary text-white font-bold px-4 py-2 rounded-md w-48 mt-3'>Create Nilai</button>
                    </Link>
                </div>
                <label htmlFor="" className='relative block mt-3'>
                    <span className='sr-only'>Search</span>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                        <IoSearchOutline className='w-5 h-5' />
                    </span>
                    <input type="text" name="search" onChange={e => setSearch(e.target.value)} placeholder="Search for anything..." className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:w-80' />
                </label>
                <div className='mt-3'>
                    <Tables>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NPM</th>
                                <th>Program Studi</th>
                                <th>Pemberi Nilai</th>
                                <th>Total Nilai</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
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
                                        search.toLowerCase() === '' ? item : item.Mahasiswa.name.toLowerCase().includes(search.toLowerCase())
                                    )).length > 0 ? (
                                        currentPost.filter(item => (
                                            search.toLowerCase() === '' ? item : item.Mahasiswa.name.toLowerCase().includes(search.toLowerCase())
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
                                                            <div className="font-bold">{item.Mahasiswa.name}</div>
                                                            <div className="text-sm opacity-50">{item.Mahasiswa.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.npm}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`px-4 py-2 rounded-lg text-white ${item.Mahasiswa.prodi === "Informatika" ? 'bg-blue-500' : 'bg-orange-500'}`}
                                                    >
                                                        {item.Mahasiswa.prodi}
                                                    </span>
                                                </td>
                                                <td>
                                                    {item.User.name}
                                                </td>
                                                <td>
                                                    {item.total}
                                                </td>
                                                <td>{foramterDate(item.createdAt)}</td>
                                                <th className=''>
                                                    <Link to={`/mitra-dashboard/nilai/${item.id}`}>
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
                                                    Tidak ada nilai yang diberikan
                                                </DataNotFound>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Tables>
                    {!isLoading && (
                        <Pagination
                            totalPost={nilai && nilai.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            postPerPage={postPerPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MitraNilai
