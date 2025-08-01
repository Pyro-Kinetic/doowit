import dance from "../assets/dancing.jpg"

export default function HomePage() {
    return (
        <main className={"d-flex flex-column"}>
            <img src={dance} className={"w-100 ms-2"} alt="Illustration of three people dancing"/>
        </main>
    )
}