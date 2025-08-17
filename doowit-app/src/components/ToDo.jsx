import moon from "../assets/moon.png"
import planet from "../assets/planet.png"
import sun from "../assets/sun.png"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

export default function ToDo({entry, removeToDo, setEditingId, setEntry}) {
    const imageURL = () => {
        if (entry.priority === "moon") return moon
        else if (entry.priority === "planet") return planet
        else return sun
    }

    const toDoItemColorPicker = () => {
        if (entry.priority === "moon") return "moon-background"
        else if (entry.priority === "planet") return "planet-background"
        else return "sun-background"
    }

    function handleRemoveToDo() {
        removeToDo(entry.id)
    }

    function setIdAndEntryState() {
        setEditingId(entry.id)
        setEntry(entry)
    }

    return (
        <div className={`to-do-items ${toDoItemColorPicker()} bg-gradient bg-opacity-50 rounded-1 p-2 text-center`}>
            <div className={"d-flex align-items-center justify-content-between"}>
                <img src={imageURL()} className={"pointer"} alt={"priority icon"}/>
                <FontAwesomeIcon onClick={setIdAndEntryState} className={"planet"} icon="fa-solid fa-pencil"
                                 size={"lg"}/>
                <FontAwesomeIcon onClick={handleRemoveToDo} className={"text-danger pointer"} icon="fa-solid fa-square-xmark"
                                 size={"xl"}/>
            </div>
            <h2 className={"hachi-maru-pop-bold"}>{entry.title}</h2>
            <p className={"roboto-light"}>{entry.description}</p>
        </div>
    )
}