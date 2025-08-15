import {useState} from "react";
import dance from "../assets/dancing.jpg"
import data from "../appData";
import AddToDoForm from "./AddToDoForm";
import EditToDoForm from "./EditToDoForm";
import ToDo from "./ToDo";
import {v4 as uuidv4} from "uuid";

export default function HomePage() {
    const [toDoList, setToDoList] = useState(data)
    const [editingId, setEditingId] = useState(null)
    const [entry, setEntry] = useState(null)

    function addToDo(obj) {
        setToDoList(prevToDoList => {
            return ([...prevToDoList, obj])
        })
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
        <h1 className={"hachi-maru-pop-regular mb-3"}>To Do+</h1>
        <main>
            {toDoElements}
        </main>
        <AddToDoForm
            addToDo={addToDo}
        />
        {editingId && (<EditToDoForm editToDo={editToDo} editingId={editingId} entry={entry}/>)}
    </div>)
}