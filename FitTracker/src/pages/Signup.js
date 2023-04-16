import React,{useState} from 'react';
import { useSignup } from '../hooks/useSignup';


const Signup = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {signup,error,isLoading} = useSignup()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // to signup the user
        await signup(email,password)
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
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>Email:</label>
            <input 
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
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
             <button type='submit' disabled={isLoading}>Sign up</button>
             {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Signup;