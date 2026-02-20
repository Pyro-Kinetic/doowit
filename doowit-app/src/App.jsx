import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import guestData from "./appData";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import {postData} from "./utils/axiosRequests";
import {setCountState} from "./utils/reactSpecific";
import ContactPage from "./components/ContactPage"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(fas, far, fab)

function App() {
    const [showLogin, setShowLogin] = useState(true)
    const [showHomePage, setShowHomePage] = useState(false)
    const [showContactPage, setShowContactPage] = useState(false)
    const [toDoList, setToDoList] = useState(guestData)
    const [showCompletedOnly, setShowCompletedOnly] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [count, setCount] = useState(0)

    function addToDo(obj) {
        obj["completed"] = false
        setToDoList(prev => [obj, ...prev])
    }

    function removeToDo(id) {
        const url = 'http://localhost:8000/api/item/delete'

        if (isLoggedIn) {
            postData(url, {id: id}).then(res => {
                setCountState(setCount)
                return res
            })
        }

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

    function showLoginPage() {
        setShowLogin(true)
        setShowHomePage(false)
        setShowContactPage(false)
    }

    function togglePages() {
        setShowLogin(false)
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
                <h1 onClick={showLoginPage} className={"hachi-maru-pop-bold rich-black pointer"}>Doowit!</h1>
                <div className="d-flex align-items-center gap-2">
                    {showLogin && (
                        <button onClick={() => {
                            setShowLogin(false)
                            setShowHomePage(true)
                        }} className="btn roboto planet-background planet-hover text-light">Guest Mode</button>
                    )}
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
            {showLogin && <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
            {showHomePage && (
                <HomePage count={count}
                          addToDo={addToDo}
                          setCount={setCount}
                          editToDo={editToDo}
                          isLoggedIn={isLoggedIn}
                          removeToDo={removeToDo}
                          toDoList={displayedList}
                          setToDoList={setToDoList}
                          completeToDo={completeToDo}
                          showCompletedOnly={showCompletedOnly}/>)}
            {showContactPage && (<ContactPage/>)}
        </div>
    );
}

export default App;
