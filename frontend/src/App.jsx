import {v4 as uuidv4} from "uuid";
import guestData from "./appData";
import {useEffect, useState} from "react";
import {API_URLS} from "./config/apiurls";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import {getData, postData} from "./utils/axiosRequests";
import ContactPage from "./components/ContactPage"
import {setCountState} from "./utils/reactSpecific";

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

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await getData(API_URLS.getSession).then(res => {
                    return res
                })

                if (response.isLoggedIn) {
                    setIsLoggedIn(true)
                    setShowLogin(false);
                    setShowHomePage(true);
                }

            } catch (error) {
                setIsLoggedIn(false)
            }
        }

        checkSession().then(res => res)
    }, [isLoggedIn, setShowLogin, setShowHomePage]);

    function addToDo(obj) {
        obj["completed"] = false
        setToDoList(prev => [obj, ...prev])
    }

    function removeToDo(id) {
        const url = API_URLS.deleteItem

        if (isLoggedIn) {
            postData(url, {id: id}).then(res => {
                setCountState(setCount)
                return res
            })
            return
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
        const url = API_URLS.markItemAsComplete
        const data = {
            id: id, priority: "star", completed: 1,
        }

        if (isLoggedIn) {
            postData(url, data).then(res => {
                setCountState(setCount)
                return res
            })
            return
        }

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

    function renderUserMode() {
        if (isLoggedIn) return "To Do+"
        return "Guest Mode"
    }

    function renderHomeTitle() {
        const title = 'Doowit'
        if (!showHomePage) return title;

        return (<>
            {title} {" "}
            <FontAwesomeIcon className={"btn btn-info"} icon="fa-solid fa-house"/>
        </>);
    }

    const displayedList = showCompletedOnly ? toDoList.filter(entry => entry.completed) : toDoList

    return (<div className={"container"}>
        <div className="d-flex justify-content-between align-items-center mt-3">
            <h1 onClick={showLoginPage}
                className={"hachi-maru-pop-bold rich-black pointer"}>{renderHomeTitle()}</h1>
            <div className="d-flex align-items-center gap-2">
                {showLogin && (<button onClick={() => {
                    setShowLogin(false)
                    setShowHomePage(true)
                }}
                                       className="btn roboto planet-background planet-hover text-light">{renderUserMode()}</button>)}
                {showHomePage && (<>
                    <FontAwesomeIcon onClick={toggleShowCompleted}
                                     className={`btn text-light ${isChecked()} pointer mx-auto`}
                                     icon="fa-solid fa-circle-check"
                                     size={"xl"}/>
                    <button onClick={togglePages}
                            className="btn roboto sun-background sun-hover">Contact
                    </button>
                </>)}
                {showContactPage && (<button onClick={togglePages}
                                             className="btn text-light roboto planet-background planet-hover">Home
                </button>)}
            </div>
        </div>
        {showLogin && <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
        {showHomePage && (<HomePage count={count}
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
    </div>);
}

export default App;
