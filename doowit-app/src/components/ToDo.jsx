import {useState} from "react";
import moon from "../assets/moon.png"
import planet from "../assets/planet.png"
import sun from "../assets/sun.png"
import star from "../assets/star.png"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

export default function ToDo({entry, removeToDo, setEditingId, setEntry, completeToDo}) {
    const [showView, setShowView] = useState(false)

    const imageURL = () => {
        if (entry.priority === "moon") return moon
        else if (entry.priority === "planet") return planet
        else if (entry.priority === "sun") return sun
        else return star
    }

    const toDoItemColorPicker = () => {
        if (entry.priority === "moon") return "moon-background"
        else if (entry.priority === "planet") return "planet-background"
        else if (entry.priority === "sun") return "sun-background"
        else return "star-background"
    }

    function markToDoComplete() {
        completeToDo(entry.id)
    }

    function handleRemoveToDo() {
        removeToDo(entry.id)
    }

    function setIdAndEntryState() {
        setEditingId(entry.id)
        setEntry(entry)
    }

    function openViewModal() {
        setShowView(true)
    }

    function closeViewModal() {
        setShowView(false)
    }

    function handleClick(e) {
        if (e.target === e.currentTarget) closeViewModal();
    }

    return (
        <div className={`to-do-items ${toDoItemColorPicker()} bg-gradient bg-opacity-50 rounded-1 p-2 text-center`}>
            <div className={"d-flex align-items-center justify-content-between"}>
                <img src={imageURL()} onClick={markToDoComplete} className={"pointer"} alt={"priority icon"}/>
                <FontAwesomeIcon onClick={setIdAndEntryState} className={"planet"} icon="fa-solid fa-pencil"
                                 size={"lg"}/>
                <FontAwesomeIcon onClick={handleRemoveToDo} className={"text-danger pointer"}
                                 icon="fa-solid fa-square-xmark"
                                 size={"xl"}/>
            </div>
            <div className={"pointer"} onClick={openViewModal}>
                <h2 className={"hachi-maru-pop-bold"}>{entry.title}</h2>
                <p className={"roboto-light"}>{entry.description}</p>
            </div>

            {showView && (
                <div className="modal-backdrop-custom" onClick={handleClick}>
                    <section className="modal-custom" role="dialog" aria-modal="true"
                             aria-labelledby={`view-todo-title-${entry.id}`}>
                        <header className={`modal-header ${toDoItemColorPicker()}`}>
                            <h1 id={`view-todo-title-${entry.id}`}
                                className="hachi-maru-pop-regular rich-black">{entry.title}</h1>
                        </header>
                        <div className="modal-body">
                            <p className="roboto-light" style={{whiteSpace: 'pre-wrap'}}>{entry.description}</p>
                            <footer className="modal-footer">
                                <button className="btn-primary" onClick={closeViewModal}>Close</button>
                            </footer>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}