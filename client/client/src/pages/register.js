import { useState } from 'react';
import Form from './components/form';
import Link from 'next/link';
import Navbar from './components/navbar';

const Register = () => {
    return (
        <div>
            <Navbar />
            <Form />
        </div>

    )
};

export default Register;