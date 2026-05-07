import { } from 'react'

export default function Error({ children }: { children: React.ReactNode }) {
    return (
        <p className='text-red-600 my-3 font-bold-3 text-sm uppercase'>
            {children}
        </p>
    )
}
