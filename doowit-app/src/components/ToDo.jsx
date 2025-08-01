import moon from "../assets/moon.png"
import planet from "../assets/planet.png"
import sun from "../assets/sun.png"

export default function ToDo({entry}) {
    const imageURL = () => {
        if (entry.icon === "small") return moon
        else if (entry.icon === "medium") return planet
        else return sun
    }

    return (
        <div>
            <img src={imageURL()} className={"img-fluid"} alt={"moon icon"}/>
            <h2>{entry.title}</h2>
            <p>{entry.text}</p>
        </div>
    )
}