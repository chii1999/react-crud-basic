import React from 'react'
import { Spinner } from "react-bootstrap"

export default function LoadingPage() {
    return (
        <div className='w-100 h-50 d-flex justify-content-center align-items-center'>
            <Spinner animation="border" />
            <p>Loading...</p>
        </div>
    )
}
