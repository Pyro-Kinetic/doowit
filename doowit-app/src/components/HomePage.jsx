// import {useState} from "react";
import dance from "../assets/dancing.jpg"
import ToDo from "./ToDo";
import data from "../appData";

export default function HomePage() {
    // const [toDo, setToDo] = useState(data)

    const toDoElements = data.map(entry => {
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