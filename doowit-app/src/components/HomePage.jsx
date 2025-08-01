import {useState} from "react";
import dance from "../assets/dancing.jpg"
import ToDo from "./ToDo";
import data from "../appData";

export default function HomePage() {
    const [toDo, setToDo] = useState(data)
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


    function addToDo() {
        if (num === 1) {
            setToDo(prevToDo => {
                return ([...prevToDo, newData(prevToDo)])
            })

            setNum(prevState => {
                return prevState - 1
            })
        }
    }

    function removeToDo(id) {
        if (num === 2) {
            setToDo(prevToDo => {
                return prevToDo.filter(entry => entry.id !== id)
            })

            setNum(0)
        }
    }

    addToDo()
    removeToDo(1)

    const toDoElements = toDo.map(entry => {
        return (
            <ToDo
                key={entry.id}
                entry={entry}
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
        </div>
    )
}