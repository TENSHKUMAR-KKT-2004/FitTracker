import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    const hanldlePasswordVisibility = () => {
        var password = document.getElementById('Password');
        var toggler = document.getElementById('toggler');

        const showHidePassword = () => {
            if (password.type === 'password') {
                password.setAttribute('type', 'text');
                toggler.innerHTML = 'visibility_off';
            } else {
                toggler.innerHTML = 'visibility';
                password.setAttribute('type', 'password');
            }
        };

        toggler.addEventListener('click', showHidePassword);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
            />
            <label>Password:</label>
            <div className="password-field">
                <input
                    type="password"
                    id="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                />
                <span onClick={hanldlePasswordVisibility} id="toggler" class="material-symbols-outlined">
                    visibility
                </span>
            </div>
            <button type='submit' disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Login;