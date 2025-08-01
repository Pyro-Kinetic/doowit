import HomePage from "./components/HomePage";

function App() {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h1 className={"hachi-maru-pop-bold"}>Doowit !</h1>
                <button className="btn btn-outline-info">Contact</button>
            </div>
            <HomePage/>
        </>
    );
}

export default App;
