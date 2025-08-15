import {useState} from "react";
import dance from "../assets/dancing.jpg"
import data from "../appData";
import AddToDoForm from "./AddToDoForm";
import ToDo from "./ToDo";

export default function HomePage() {
    const [toDoList, setToDoList] = useState(data)


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

    // function editToDo(id, obj) {
    //     setToDoList(prevToDoList => {
    //         const filtered = prevToDoList.filter(entry => entry.id !== id)
    //         return [...filtered, obj]
    //     })
    // }


    const toDoElements = toDoList.map(entry => {
        return (
            <ToDo
                key={entry.id}
                entry={entry}
                removeToDo={removeToDo}
            />
        )
    })

    return (
        <div className={"d-flex flex-column"}>
            <img src={dance} className={"img-fluid ms-3"} alt="Illustration of three people dancing"/>
            <h1 className={"hachi-maru-pop-regular mb-3"}>To Do+</h1>
            <main>
                {toDoElements}
            </main>
            <AddToDoForm
                addToDo={addToDo}
            />
        </div>
    )
}