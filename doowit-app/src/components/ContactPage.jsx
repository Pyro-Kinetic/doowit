import contactGraphic from "../assets/contact.jpg"
import {useState} from "react";

export default function ContactPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [comments, setComments] = useState("")

    function handleFirstNameChange(event) {
        setFirstName(event.target.value)
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value)
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handleCommentsChange(event) {
        setComments(event.target.value)
    }

    return (
        <div className={"d-flex flex-column mb-3"}>
            <img src={contactGraphic} className={"img-fluid mb-3"} alt="Illustration of three people dancing"/>

            <section className="modal-custom">
                <header className="modal-header">
                    <h2 className="hachi-maru-pop-regular rich-black m-0">Contact Us</h2>
                </header>

                <form className="modal-body" action={"https://formspree.io/f/meozwkny"} method={"POST"}>
                    <label htmlFor={"first-name"} className="roboto">First Name</label>
                    <input id={"first-name"} name={"first-name"} type={"text"} placeholder={"John"} value={firstName}
                           onChange={handleFirstNameChange} required/>

                    <label htmlFor={"last-name"} className="roboto">Last Name</label>
                    <input id={"last-name"} name={"last-name"} type={"text"} placeholder={"Doe"} value={lastName}
                           onChange={handleLastNameChange} required/>

                    <label htmlFor={"email"} className="roboto">Email</label>
                    <input id={"email"} name={"email"} type={"email"} placeholder={"johndoe@gmail.com"} value={email}
                           onChange={handleEmailChange} required/>

                    <label htmlFor={"comments"} className="roboto">Comments</label>
                    <textarea id={"comments"} name={"comments"} placeholder={"Share your thoughts..."} value={comments}
                              onChange={handleCommentsChange} rows={4}></textarea>

                    <footer className="modal-footer">
                        <button className="btn-primary" type="submit">Submit</button>
                    </footer>
                </form>
            </section>
        </div>
    )
}