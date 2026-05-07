import { } from 'react'
import { usePatientStore } from '../store'
import PatientDetails from './PatientDetails';

export default function PatientList() {
    const { patients } = usePatientStore();

    return (
        <div className='md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll'>
            {patients.length ? (
                <>
                    <h2 className='font-black text-3xl text-center'>Listado de Pacientes</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Administra tus {''}
                        <span className='text-indigo-600 font-bold'>Pacientes y Citas.</span>
                    </p>
                    {patients.map(p => (
                        <PatientDetails
                            key={p.id}
                            patient={p}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Comienza agregando pacientes {''}
                        <span className='text-indigo-600 font-bold'>y aparecerán en este lugar.</span>
                    </p>
                </>
            )}
        </div>
    )
}
