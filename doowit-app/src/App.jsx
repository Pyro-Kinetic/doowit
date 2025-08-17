import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage"
import {useState} from "react";
import data from "./appData";
import {v4 as uuidv4} from "uuid";

function App() {
    const [showHomePage, setShowHomePage] = useState(true)
    const [showContactPage, setShowContactPage] = useState(false)
    const [toDoList, setToDoList] = useState(data)

    function addToDo(obj) {
        obj["completed"] = false
        setToDoList(prev => [...prev, obj])
    }

    function removeToDo(id) {
        setToDoList(prev => prev.filter(entry => entry.id !== id))
    }

    function editToDo(id, obj) {
        obj["completed"] = false
        const updated = {...obj, id: uuidv4()}
        setToDoList(prev => {
            const filtered = prev.filter(entry => entry.id !== id)
            return [updated, ...filtered]
        })
    }

    function completeToDo(id) {
        setToDoList(prev => {
            return prev.map(entry => entry.id === id ? {...entry, completed: true, priority: "star"} : entry)
        })
    }

    function togglePages() {
        setShowHomePage(!showHomePage)
        setShowContactPage(!showContactPage)
    }

    return (
        <div className={"container"}>
            <div className="d-flex justify-content-between mt-3">
                <h1 className={"hachi-maru-pop-bold rich-black"}>Doowit!</h1>
                {showHomePage && (<button onClick={togglePages}
                                          className="btn roboto sun-background sun-hover">Contact</button>)}
                {showContactPage && (<button onClick={togglePages}
                                             className="btn text-light roboto planet-background planet-hover">Home</button>)}
            </div>
            {showHomePage && (
                <HomePage toDoList={toDoList} addToDo={addToDo} removeToDo={removeToDo} editToDo={editToDo}
                          completeToDo={completeToDo}/>)}
            {showContactPage && (<ContactPage/>)}
        </div>
    );
}

export default App;
