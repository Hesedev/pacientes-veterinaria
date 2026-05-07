import { useEffect } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import Error from './Error'
import type { PatientForm } from '../types';
import { usePatientStore } from '../store';
import { toast } from 'react-toastify';

const initialFormState: PatientForm = {
    name: '',
    caretaker: '',
    email: '',
    date: new Date(),
    symptoms: ''
};

export default function PatientForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PatientForm>({ defaultValues: initialFormState });

    const addPatient = usePatientStore(state => state.addPatient);
    const updatePatient = usePatientStore(state => state.updatePatient);
    const editingId = usePatientStore(state => state.editingId);
    const setEditingId = usePatientStore(state => state.setEditingId);
    const patients = usePatientStore(state => state.patients);

    useEffect(() => {
        if (editingId) {
            const editingPatient = patients.find(p => p.id === editingId);
            if (editingPatient) {
                const { id, ...formData } = editingPatient;
                reset(formData);
            }
        } else {
            reset(initialFormState);
        }
    }, [editingId]);

    const registerPatient: SubmitHandler<PatientForm> = (data) => {
        if (editingId) {
            updatePatient(data);
            toast.success('Paciente actualizado correctamente.');
        } else {
            addPatient(data);
            toast.success('Paciente registrado correctamente.');
        }
        reset(initialFormState);
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit={handleSubmit(registerPatient)}
                noValidate
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className={errors.name
                            ? "w-full p-3 border-2 border-red-600 focus:outline-none"
                            : "w-full p-3 border border-gray-100"
                        }
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register("name", {
                            required: "El nombre del paciente es obligatorio"
                        })}
                    />
                    {errors.name && (
                        <Error>{errors.name.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className={errors.caretaker
                            ? "w-full p-3 border-2 border-red-600 focus:outline-none"
                            : "w-full p-3 border border-gray-100"
                        }
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register("caretaker", {
                            required: "El propietario es obligatorio"
                        })}
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className={errors.email
                            ? "w-full p-3 border-2 border-red-600 focus:outline-none"
                            : "w-full p-3 border border-gray-100"
                        }
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email No Válido'
                            }
                        })}
                    />
                    {errors.email && (
                        <Error>{errors.email.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className={errors.date
                            ? "w-full p-3 border-2 border-red-600 focus:outline-none"
                            : "w-full p-3 border border-gray-100"
                        }
                        type="date"
                        {...register("date", {
                            required: "La fecha de alta es obligatoria"
                        })}
                    />
                    {errors.date && (
                        <Error>{errors.date.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className={errors.symptoms
                            ? "w-full p-3 border-2 border-red-600 focus:outline-none"
                            : "w-full p-3 border border-gray-100"
                        }
                        placeholder="Síntomas del paciente"
                        {...register("symptoms", {
                            required: "Los síntomas son obligatorios"
                        })}
                    />
                    {errors.symptoms && (
                        <Error>{errors.symptoms.message}</Error>
                    )}
                </div>

                <div className='flex flex-col gap-3'>
                    {editingId && (
                        <button
                            type='button'
                            className="bg-gray-600 w-full p-3 text-white uppercase font-bold hover:bg-gray-700 cursor-pointer transition-colors"
                            onClick={() => setEditingId('')}
                        >cancelar Edición
                        </button>
                    )}
                    <input
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                        value={editingId ? 'Guardar Cambios' : 'Guardar Paciente'}
                    />
                </div>

            </form>
        </div>
    )
}