import {useState} from "react";

export default function Register({handleBackdropClick}) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        console.log("Form submitted:", formData);
        // Add registration logic here if needed
        handleBackdropClick();
    }

    return (
        <div className="modal-backdrop-custom" onClick={(e) => {
            if (e.target === e.currentTarget) handleBackdropClick();
        }}>
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
        </div>
    );
}
