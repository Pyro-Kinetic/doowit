import {useState} from "react";

export default function Login({handleBackdropClick}) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Login submitted:", formData);
        // Add login logic here if needed
        handleBackdropClick();
    }

    return (
        <div className="modal-backdrop-custom" onClick={(e) => {
            if (e.target === e.currentTarget) handleBackdropClick();
        }}>
            <section className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="login-title">
                <header className="modal-header">
                    <h1 id="login-title" className="hachi-maru-pop-regular rich-black">Login</h1>
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

                    <footer className="modal-footer">
                        <button type="submit" className="btn-primary">Login</button>
                    </footer>
                </form>
            </section>
        </div>
    );
}
