import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const router = useRouter();

    const { username, email, password, confirmPassword } = formData;

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4200/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            // Redirect to login page if user was created successfully
            if (response.ok) {
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='formRegister'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        minLength='6'
                        required
                    />
                </div>
                <input className='registerButton' type='submit' value='Register' />
            </form>
            <p>Already have an account? <Link href="/login"><button>Login</button></Link></p>
        </div>
    );
};

export default Form;