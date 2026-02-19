import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {postData} from "../utils/axiosRequests";

export default function AddToDoForm({setCount, addToDo, isLoggedIn, handleBackdropClick}) {

    const [todoItem, setTodoItem] = useState({
        id: uuidv4(),
        title: "",
        description: "",
        priority: "moon"
    })

    function closeModal(e) {
        if (e.target === e.currentTarget) handleBackdropClick();
    }

    function handleChange(e) {
        const {name, value} = e.target
        setTodoItem(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(formData) {
        // *NOTE TO SELF* Updating the 'todoItem' state with the onChange event is redundant because 'allData' already have the data needed.
        // Meaning you can use 'allData' directly without updating the state.

        const allData = Object.fromEntries(formData)
        const url = 'http://localhost:8000/api/item/add'

        if (isLoggedIn) {
            postData(url, todoItem).then(response => {
                setCount(prev => {
                    if (prev >= 1) return prev - 1
                    else return prev + 1
                })
                return response
            })

            handleBackdropClick()
            return
        }

        handleBackdropClick()
        addToDo(allData)
    }

    return (
        <div className="modal-backdrop-custom" onClick={closeModal}>
            <section className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="add-todo-title">

                <header className="modal-header">
                    <h1 id="add-todo-title" className="hachi-maru-pop-regular rich-black">To Do+</h1>
                </header>

                <form className="modal-body" action={handleSubmit}>
                    {/*form ID*/}
                    <input className={"d-none"}
                           type={"text"}
                           name={"id"}
                           defaultValue={uuidv4()}/>

                    <label htmlFor={"title"} className="roboto">Title</label>
                    <input id={"title"}
                           type={"text"}
                           name={"title"}
                           maxLength={25}
                           placeholder={"Add a new task..."}
                           onChange={handleChange}
                           required/>

                    <label htmlFor={"description"} className="roboto">Description</label>
                    <textarea id={"description"}
                              name={"description"}
                              placeholder={"Enter task description (e.g., Email Sarah the revised contract terms by Friday)"}
                              maxLength={150}
                              onChange={handleChange}
                    ></textarea>

                    <fieldset className="modal-fieldset"
                              onChange={handleChange}>

                        <legend>Priority</legend>

                        <label htmlFor={"small"}>Small</label>
                        <input id={"small"}
                               type={"radio"}
                               name={"priority"}
                               defaultChecked={true}
                               value={"moon"}/>

                        <label htmlFor={"medium"}>Medium</label>
                        <input id={"medium"}
                               type={"radio"}
                               name={"priority"}
                               value={"planet"}/>

                        <label htmlFor={"large"}>Large</label>
                        <input id={"large"}
                               type={"radio"}
                               name={"priority"}
                               value={"sun"}/>
                    </fieldset>

                    <footer className="modal-footer">
                        <button className="btn-primary">Add+</button>
                    </footer>
                </form>

            </section>
        </div>
    )
}