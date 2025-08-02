import {useState} from "react";
import dance from "../assets/dancing.jpg"
import data from "../appData";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";

export default function HomePage() {
    const [toDoList, setToDoList] = useState(data)
    const [num, setNum] = useState(1)

    function newData(data) {
        return (
            {
                id: data.length + 1,
                icon: "small",
                title: "Read Book",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                    "Donec diam metus, tristique nec erat id, vehicula posuere orci. " +
                    "Praesent sit amet eleifend tortor. Aliquam dignissim convallis ornare. " +
                    "Etiam eget elit in risus laoreet sodales. Sed a iaculis mauris. Praesent imperdiet."
            }
        )
    }


    function addToDo(obj) {
        if (num === 1) {
            setToDoList(prevToDoList => {
                return ([...prevToDoList, newData(prevToDoList)])
            })

            setNum(prevState => {
                return prevState - 1
            })
        }
    }

    function removeToDo(id) {
        setToDoList(prevToDoList => {
            return prevToDoList.filter(entry => entry.id !== id)
        })
    }

    addToDo()

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
            <ToDoForm />
        </div>
    )
}