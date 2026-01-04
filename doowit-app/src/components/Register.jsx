import {useState} from "react";
import axios from "axios"

export default function Register({handleBackdropClick, setMessage, setError, error}) {
    const [formData, setFormData] = useState({
        email: "", password: "", confirmPassword: ""
    });

    function handleClick(e) {
        if (e.target === e.currentTarget) handleBackdropClick();
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    }

    async function postUserData(url) {
        try {
            const response = await axios.post(url, formData);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error details:', error.message);
            setError(error.message)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const baseUrl = 'http://localhost:8000/api/authorization/register'

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        postUserData(baseUrl)

        handleBackdropClick();
    }

    return (
        <div className="modal-backdrop-custom" onClick={handleClick}>
            <section className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="register-title">
                <header className="modal-header">
                    <h1 id="register-title" className="hachi-maru-pop-regular rich-black">Sign Up</h1>
                </header>

                <form className="modal-body" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="roboto">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password" className="roboto">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="confirmPassword" className="roboto">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {error && <p className="text-danger roboto-light">{error}</p>}

                    <footer className="modal-footer">
                        <button type="submit" className="btn-primary">Register</button>
                    </footer>
                </form>
            </section>
        </div>);
}
