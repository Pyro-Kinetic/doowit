import dance from "../assets/dancing.jpg"
import ToDo from "./ToDo";

export default function HomePage() {
    return (
        <main className={"d-flex flex-column"}>
            <img src={dance} className={"img-fluid ms-3"} alt="Illustration of three people dancing"/>
            <h1 className={"hachi-maru-pop-regular mb-3"}>To Do+</h1>
            <ToDo />
        </main>
    )
}