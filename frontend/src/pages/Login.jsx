import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [ formData, setFormData ] = useState({ email: "", password: "" });
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate(); // <- For Navigation

    const handleChange = (e)=>{
        setFormData(prev => ({ ...prev, [ e.target.name ] : e.target.value }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMessage('');

        try {
            const res = await axios.post('http://localhost:3000/auth/login', formData);
            const { token, message } = res.data;

            localStorage.setItem('token', token);
            setMessage(message);

            // Redirect after login
            navigate("/");
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login Failed');
        }
    };

    return (
       <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white px-4">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-500">Login</h2>

                {message && (
                <p className="mb-4 text-sm text-red-400 text-center">{message}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition duration-200"
                >
                    Login
                </button>
                </form>
            </div>
    </div>
    )
};

export default Login;