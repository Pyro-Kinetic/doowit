import {useState} from 'react'
import {postData} from '../utils/axiosRequests'
import {API_URLS} from '../config/apiurls'
import {setCountState} from "../utils/reactSpecific";

export default function EditToDoForm({entry, setCount, editToDo, editingId, isLoggedIn, handleBackdropClick}) {

    const [editedItem, setEditedItem] = useState({
        id: entry.id, title: entry.title, description: entry.description, priority: "moon", completed: 0
    })

    function closeModal(e) {
        if (e.target === e.currentTarget) handleBackdropClick();
    }

    function handleChange(e) {
        const {name, value} = e.target
        setEditedItem(prev => ({
            ...prev, [name]: value
        }))
    }

    function handleEditToDoSubmission(formData) {
        const url = API_URLS.editItem
        const allData = Object.fromEntries(formData)

        if (isLoggedIn) {
            postData(url, editedItem).then(res => {
                setCountState(setCount)
                return res
            })

            handleBackdropClick()
            return
        }

        editToDo(editingId, allData)
        handleBackdropClick()
    }

    return (<div className="modal-backdrop-custom" onClick={closeModal}>
            <section className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="add-todo-title">

                <header className="modal-header">
                    <h1 id="add-todo-title" className="hachi-maru-pop-regular rich-black">To Do+</h1>
                </header>

                <form className="modal-body" action={handleEditToDoSubmission}>
                    <label htmlFor={"title"} className="roboto">Title</label>
                    <input id={"title"}
                           type={"text"}
                           name={"title"}
                           maxLength={25}
                           defaultValue={entry.title}
                           onChange={handleChange}
                           required
                    />

                    <label htmlFor={"description"} className="roboto">Description</label>
                    <textarea id={"description"}
                              name={"description"}
                              maxLength={150}
                              defaultValue={entry.description}
                              onChange={handleChange}
                              required
                    ></textarea>

                    <fieldset className="modal-fieldset"
                              onChange={handleChange}
                    >
                        <legend>Priority</legend>

                        <label htmlFor={"small"}>Small</label>
                        <input id={"small"}
                               type={"radio"}
                               name={"priority"}
                               defaultChecked={true}
                               value={"moon"}
                        />

                        <label htmlFor={"medium"}>Medium</label>
                        <input id={"medium"}
                               type={"radio"}
                               name={"priority"}
                               value={"planet"}
                        />

                        <label htmlFor={"large"}>Large</label>
                        <input id={"large"}
                               type={"radio"}
                               name={"priority"}
                               value={"sun"}
                        />
                    </fieldset>

                    <footer className="modal-footer">
                        <button className="btn-primary">Save+</button>
                    </footer>
                </form>

            </section>
        </div>)
}