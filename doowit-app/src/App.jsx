import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage"
import {useState} from "react";
import data from "./appData";
import {v4 as uuidv4} from "uuid";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

function App() {
    const [showHomePage, setShowHomePage] = useState(true)
    const [showContactPage, setShowContactPage] = useState(false)
    const [toDoList, setToDoList] = useState(data)
    const [showCompletedOnly, setShowCompletedOnly] = useState(false)

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

    function toggleShowCompleted() {
        setShowCompletedOnly(prev => !prev)
    }

    function isChecked() {
        return showCompletedOnly ? "btn-success" : "btn-primary"
    }

    const displayedList = showCompletedOnly ? toDoList.filter(entry => entry.completed) : toDoList

    return (
        <div className={"container"}>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h1 className={"hachi-maru-pop-bold rich-black"}>Doowit!</h1>
                <div className="d-flex align-items-center gap-2">
                    {showHomePage && (
                        <>
                            <FontAwesomeIcon onClick={toggleShowCompleted}
                                             className={`btn text-light ${isChecked()} pointer mx-auto`}
                                             icon="fa-solid fa-circle-check"
                                             size={"xl"}/>
                            <button onClick={togglePages}
                                    className="btn roboto sun-background sun-hover">Contact
                            </button>
                        </>
                    )}
                    {showContactPage && (
                        <button onClick={togglePages}
                                className="btn text-light roboto planet-background planet-hover">Home
                        </button>
                    )}
                </div>
            </div>
            {showHomePage && (
                <HomePage toDoList={displayedList} addToDo={addToDo} removeToDo={removeToDo} editToDo={editToDo}
                          completeToDo={completeToDo} showCompletedOnly={showCompletedOnly}/>)}
            {showContactPage && (<ContactPage/>)}
        </div>
    );
}

export default App;
