import { } from 'react';
import type { Patient } from '../types';
import PatientDetailItem from './PatientDetailItem';
import { usePatientStore } from '../store';
import { toast } from 'react-toastify';

export default function PatientDetails({ patient }: { patient: Patient }) {
    const { id, name, caretaker, date, symptoms, email } = patient;
    const deletePatient = usePatientStore(state => state.deletePatient);
    const setEditingId = usePatientStore(state => state.setEditingId);

    return (
        <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
            <PatientDetailItem label="ID" value={id} />
            <PatientDetailItem label="Nombre" value={name} />
            <PatientDetailItem label="Propietario" value={caretaker} />
            <PatientDetailItem label="Email" value={email} />
            <PatientDetailItem label="Fecha Alta" value={date.toString()} />
            <PatientDetailItem label="Síntomas" value={symptoms} />

            <div className='flex justify-between mt-10 flex-col lg:flex-row gap-3'>
                <button
                    type='button'
                    className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
                    onClick={() => setEditingId(id)}
                >Editar
                </button>
                <button
                    type='button'
                    className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
                    onClick={() => {
                        deletePatient(id);
                        toast.error('Paciente eliminado correctamente.');
                    }}
                >Eliminar
                </button>
            </div>
        </div>
    )
}
