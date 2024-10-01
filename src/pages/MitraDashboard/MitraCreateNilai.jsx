import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBimbingan, getBimbinganMitra } from '../../redux/Action/BimbinganAction'
import InputForm from '../../element/InputForm/InputForm'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { createNilai, createNilaiMitra } from '../../redux/Action/NilaiAction'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'

const MitraCreateNilai = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { bimbinganMitra, isLoading } = useSelector(state => state.bimbingan)
    const { user } = useSelector(state => state.auth)
    const [input, setInput] = useState({
        disiplin: null,
        sikap: null,
        tanggung_jawab: null,
        kehadiran: null,
        tata_tertib: null,
        penampilan: null,
        kemampuan_kerja: null,
        kualitas_kerja: null,
        keterampilan_kerja: null,
        kemampuan_berkomunikasi: null,
        kerjasama: null,
        kerajinan: null,
        percaya_diri: null,
        relevansi: null,
        isi_laporan: null,
        mhsId: null
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            disiplin: input.disiplin,
            sikap: input.sikap,
            tanggung_jawab: input.tanggung_jawab,
            kehadiran: input.kehadiran,
            tata_tertib: input.tata_tertib,
            penampilan: input.penampilan,
            kemampuan_kerja: input.kemampuan_kerja,
            kualitas_kerja: input.kualitas_kerja,
            keterampilan_kerja: input.keterampilan_kerja,
            kemampuan_berkomunikasi: input.kemampuan_berkomunikasi,
            kerjasama: input.kerjasama,
            kerajinan: input.kerajinan,
            percaya_diri: input.percaya_diri,
            relevansi: input.relevansi,
            isi_laporan: input.isi_laporan,
            mhsId: input.mhsId,
            token: user.token
        }

        try {
            dispatch(createNilaiMitra(data))
            toast.success('Success Create Nilai')
            navigate('/mitra-dashboard/nilai')
        } catch (error) {
            if (error.response) {
                toast.error("Failed Create Nilai")
            }
        }
    }

    useEffect(() => {
        dispatch(getBimbinganMitra(user.token))
    }, [dispatch])

    return (
        <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
            <Link to={'/mitra-dashboard/nilai'}>
                <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[18%]'>
                    <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                    <h1 className='text-sm self-center'>Back to previous page</h1>
                </div>
            </Link>
            <div className=''>
                <h1 className='text-lg font-bold'>Berikan Penilaian Magang</h1>
                <p className='text-sm text-slate-500'>You can create a new internship here.</p>
            </div>
            <div className='mt-10'>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        <div className=''>
                            <label htmlFor="mhsId" className='block text-sm font-bold text-slate-600 mb-2'>Mahasiswa Bimbingan</label>
                            <select name="mhsId" id="mhsId" value={input.mhsId} onChange={handleInput} className='text-sm border w-full border-primary rounded py-2 px-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                                <option value="">Pilih Mahasiswa</option>
                                {bimbinganMitra.map(item => (
                                    <option key={item.Mahasiswa.id} value={item.Mahasiswa.id}>{item.Mahasiswa.name}</option>
                                ))}
                            </select>
                        </div>
                        <InputForm
                            label="Kedisiplinan"
                            name="disiplin"
                            id="disiplin"
                            type="number"
                            value={input.disiplin}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Sikap Kerja / Prosedur Kerja"
                            name="sikap"
                            id="sikap"
                            type="number"
                            value={input.sikap}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Tanggung Jawab"
                            name="tanggung_jawab"
                            id="tanggung_jawab"
                            type="number"
                            value={input.tanggung_jawab}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Kehadiran"
                            name="kehadiran"
                            id="kehadiran"
                            type="number"
                            value={input.kehadiran}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Tata Tertib"
                            name="tata_tertib"
                            id="tata_tertib"
                            type="number"
                            value={input.tata_tertib}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Penampilan"
                            name="penampilan"
                            id="penampilan"
                            type="number"
                            value={input.penampilan}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Kemampuan Kerja"
                            name="kemampuan_kerja"
                            id="kemampuan_kerja"
                            type="number"
                            value={input.kemampuan_kerja}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Kualitas Kerja"
                            name="kualitas_kerja"
                            id="kualitas_kerja"
                            type="number"
                            value={input.kualitas_kerja}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Keterampilan Kerja"
                            name="keterampilan_kerja"
                            id="keterampilan_kerja"
                            type="number"
                            value={input.keterampilan_kerja}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Kemampuan Berkomunikasi"
                            name="kemampuan_berkomunikasi"
                            id="kemampuan_berkomunikasi"
                            type="number"
                            value={input.kemampuan_berkomunikasi}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Kerjasama"
                            name="kerjasama"
                            id="kerjasama"
                            type="number"
                            value={input.kerjasama}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Kerajinan / Inisiatif"
                            name="kerajinan"
                            id="kerajinan"
                            type="number"
                            value={input.kerajinan}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Percaya Diri"
                            name="percaya_diri"
                            id="percaya_diri"
                            type="number"
                            value={input.percaya_diri}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Relevansi Laporan"
                            name="relevansi"
                            id="relevansi"
                            type="number"
                            value={input.relevansi}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                        <InputForm
                            label="Isi Laporan"
                            name="isi_laporan"
                            id="isi_laporan"
                            type="number"
                            value={input.isi_laporan}
                            onChange={handleInput}
                            placeholder="0-100"
                        />
                    </div>
                    <div className='flex flex-col-reverse gap-2 sm:justify-start sm:flex-row-reverse'>
                        <button className='px-4 py-2 bg-secondary text-white font-semibold rounded-lg'>
                            {isLoading ? <HashLoader color="white" size={20} /> : 'Submit'}
                        </button>
                        <button className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white'>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MitraCreateNilai
