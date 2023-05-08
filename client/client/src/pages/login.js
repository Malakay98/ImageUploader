import { useState } from 'react';
import Link from 'next/link';
import Navbar from './components/navbar';
import { useRouter } from 'next/router';

const FormLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const router = useRouter();
    const { email, password } = formData;

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4200/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.msg); // Set error message if user is not found or password is incorrect
            } else {
                localStorage.setItem('token', data.token);
                router.push('/imageupd');
            }
        } catch (error) {
            console.error(error);
            setAlertMessage('User not exists or password is incorrect!.');
        }
    };

    return (
        <div><Navbar />
            <div className='formRegister'>
                <h1>Login</h1>
                {alertMessage && <div className='alert'>{alertMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            minLength='6'
                            required
                        />
                    </div>
                    <input className='registerButton' type='submit' value='Login' />
                </form>
                <p>Don't have an account? Create one. <Link href="/register"><button>Register</button></Link></p>
            </div>
        </div>
    );
};

export default FormLogin;