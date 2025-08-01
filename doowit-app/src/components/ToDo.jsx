import moon from "../assets/moon.png"
import planet from "../assets/planet.png"
import sun from "../assets/sun.png"

export default function ToDo({entry, addToDo, removeToDo}) {
    const imageURL = () => {
        if (entry.icon === "small") return moon
        else if (entry.icon === "medium") return planet
        else return sun
    }

    function handleRemoveToDo() {
        removeToDo(entry.id)
    }

    return (
        <div>
            <div className={"d-flex"}>
                <img src={imageURL()} className={"img-fluid"} alt={"moon icon"}/>
                <button
                    className={"btn btn bg-danger"}
                    onClick={handleRemoveToDo}>remove
                </button>
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.text}</p>
        </div>
    )
}