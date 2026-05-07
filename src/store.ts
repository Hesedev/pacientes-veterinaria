import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Patient, PatientForm } from "./types";

type PatientState = {
    patients: Patient[],
    editingId: Patient['id'],
    addPatient: (data: PatientForm) => void,
    deletePatient: (id: Patient['id']) => void,
    setEditingId: (id: Patient['id']) => void,
    updatePatient: (data: PatientForm) => void,
}

const createPatient = (data: PatientForm): Patient => ({ ...data, id: crypto.randomUUID() });


export const usePatientStore = create<PatientState>()(
    devtools(
        persist(
            (set) => ({
                patients: [],
                editingId: '',
                addPatient: (data) => {
                    set(state => ({
                        patients: [...state.patients, createPatient(data)]
                    }));
                },
                deletePatient: (id) => {
                    set(state => ({
                        patients: state.patients.filter(p => p.id !== id)
                    }))
                },
                setEditingId: (id) => {
                    set(() => ({
                        editingId: id
                    }))
                },
                updatePatient: (data) => {
                    set(state => ({
                        patients: state.patients.map(p => (
                            p.id === state.editingId
                                ? { ...data, id: p.id }
                                : p
                        )),
                        editingId: ''
                    }));
                },
            }),
            {
                name: 'patient-storage',
                // por default funciona con localStorage, así que no hace falta especificar
                // storage: createJSONStorage(() => localStorage)
            })
    ));