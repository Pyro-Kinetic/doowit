import {useState} from "react";
import danceGraphic from "../assets/dancing.jpg"
import AddToDoForm from "./AddToDoForm";
import EditToDoForm from "./EditToDoForm";
import ToDo from "./ToDo";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

export default function HomePage({toDoList, addToDo, removeToDo, editToDo, completeToDo, showCompletedOnly}) {
    const [editingId, setEditingId] = useState(null)
    const [entry, setEntry] = useState(null)
    const [show, setShow] = useState(false)


    function addToDoAndClose(obj) {
        addToDo(obj)
        setShow(false)
    }

    function editToDoAndClose(id, obj) {
        editToDo(id, obj)
        setEditingId(null)
    }

    function handleShow() {
        setShow(!show)
    }

    function handleBackdropClick() {
        if (editingId) setEditingId(null)
        if (show) handleShow()
    }

    const toDoElements = toDoList.map(entry => {
        return (<ToDo
            key={entry.id}
            entry={entry}
            removeToDo={removeToDo}
            setEditingId={setEditingId}
            setEntry={setEntry}
            completeToDo={completeToDo}
        />)
    })

    const renderContent = () => {
        const paragraph = showCompletedOnly ?
            "No completed to-dos yet. Mark to-dos as done to see them here!" :
            "No to-dos yet. Click the + to add your first task!"
        return toDoList.length === 0 ?
            <p className={"roboto-light text-center text-muted my-4"}>{paragraph}</p> : toDoElements
    }

    return (
        <div className={"d-flex flex-column"}>
            <img src={danceGraphic} className={"img-fluid ms-3"} alt="Illustration of three people dancing"/>
            <h1 className={"hachi-maru-pop-regular rich-black mb-3"}>To Do+</h1>
            <main className={"to-do-item-container"}>
                {renderContent()}
            </main>
            {show && (
                <AddToDoForm addToDo={addToDoAndClose} handleShow={handleShow}
                             handleBackdropClick={handleBackdropClick}/>)}
            {editingId && (
                <EditToDoForm editToDo={editToDoAndClose} editingId={editingId} entry={entry} handleShow={handleShow}
                              handleBackdropClick={handleBackdropClick}/>)}
            <div className={"position-sticky bottom-0 py-2"}>
                <FontAwesomeIcon onClick={handleShow}
                                 className={"add-hover d-block mx-auto"}
                                 icon="fa-solid fa-circle-plus"
                                 size={"3x"}/>
            </div>
        </div>
    )
}