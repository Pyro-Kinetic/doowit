import HomePage from "./components/HomePage";

function App() {
    return (
        <div className={"container"}>
            <div className="d-flex justify-content-between mt-3">
                <h1 className={"hachi-maru-pop-bold rich-black"}>Doowit!</h1>
                <button className="btn bg-gradient bg-opacity-75 roboto sun-background rich-black">Contact</button>
            </div>
            <HomePage/>
        </div>
    );
}

export default App;
