import moon from "../assets/moon.png"
import planet from "../assets/planet.png"
import sun from "../assets/sun.png"

export default function ToDo({entry, removeToDo, setEditingId, setEntry}) {
    const imageURL = () => {
        if (entry.priority === "moon") return moon
        else if (entry.priority === "planet") return planet
        else return sun
    }

    function handleRemoveToDo() {
        removeToDo(entry.id)
    }

    function setIdAndEntryState() {
        setEditingId(entry.id)
        setEntry(entry)
    }

    return (
        <div>
            <div className={"d-flex gap-2 align-items-center"}>
                <img src={imageURL()} className={"img-fluid"} alt={"priority icon"}/>
                <button
                    className={"btn btn bg-secondary"}
                    onClick={setIdAndEntryState}>edit
                </button>
                <button
                    className={"btn btn bg-danger"}
                    onClick={handleRemoveToDo}>remove
                </button>
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.description}</p>
        </div>
    )
}