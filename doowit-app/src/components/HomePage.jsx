import {useState} from "react";
import dance from "../assets/dancing.jpg"
import data from "../appData";
import AddToDoForm from "./AddToDoForm";
import EditToDoForm from "./EditToDoForm";
import ToDo from "./ToDo";
import {v4 as uuidv4} from "uuid";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

export default function HomePage() {
    const [toDoList, setToDoList] = useState(data)
    const [editingId, setEditingId] = useState(null)
    const [entry, setEntry] = useState(null)
    const [show, setShow] = useState(false)

    function addToDo(obj) {
        setToDoList(prevToDoList => {
            return ([...prevToDoList, obj])
        })

        setShow(!show)
    }

    function removeToDo(id) {
        setToDoList(prevToDoList => {
            return prevToDoList.filter(entry => entry.id !== id)
        })
    }

    function editToDo(id, obj) {
        const updated = {...obj, id: uuidv4()}

        setToDoList(prevToDoList => {
            const filtered = prevToDoList.filter(entry => entry.id !== id)
            return [...filtered, updated]
        })

        setEditingId(null)
    }

    function handleShow() {
        setShow(!show)
    }


    const toDoElements = toDoList.map(entry => {
        return (<ToDo
            key={entry.id}
            entry={entry}
            removeToDo={removeToDo}
            setEditingId={setEditingId}
            setEntry={setEntry}
        />)
    })

    return (<div className={"d-flex flex-column"}>
        <img src={dance} className={"img-fluid ms-3"} alt="Illustration of three people dancing"/>
        <h1 className={"hachi-maru-pop-regular rich-black mb-3"}>To Do+</h1>
        <main className={"to-do-item-container"}> {toDoElements} </main>
        {show && (<AddToDoForm addToDo={addToDo}/>)}
        {editingId && (<EditToDoForm editToDo={editToDo} editingId={editingId} entry={entry}/>)}
        <div className={"position-sticky bottom-0 py-2"}>
            <FontAwesomeIcon onClick={handleShow}
                             className={"planet d-block mx-auto"}
                             icon="fa-solid fa-circle-plus"
                             size={"3x"}/>
        </div>
    </div>)
}