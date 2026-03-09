import ToDo from "./ToDo";
import guestData from "../appData"
import AddToDoForm from "./AddToDoForm";
import {useEffect, useState} from "react";
import EditToDoForm from "./EditToDoForm";
import {getData} from "../utils/axiosRequests"
import danceGraphic from "../assets/dancing.jpg"
import {API_URLS} from "../config/apiurls"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

export default function HomePage({
                                     count,
                                     setCount,
                                     toDoList,
                                     setToDoList,
                                     addToDo,
                                     removeToDo,
                                     editToDo,
                                     completeToDo,
                                     showCompletedOnly,
                                     isLoggedIn
                                 }) {
    const [editingId, setEditingId] = useState(null)
    const [entry, setEntry] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            const url = API_URLS.getItem
            getData(url).then(data => {
                setToDoList(data)
            })
        } else {
            setToDoList(guestData)
        }
    }, [isLoggedIn, setToDoList, count])

    const toDoElements = toDoList.map(entry => {
        return (<ToDo
            key={entry.id}
            entry={entry}
            removeToDo={removeToDo}
            setEditingId={setEditingId}
            setEntry={setEntry}
            completeToDo={completeToDo}
        />)
    })

    function addToDoItem(obj) {
        addToDo(obj)
        setShow(false)
    }

    function editToDoItem(id, obj) {
        editToDo(id, obj)
        setEditingId(null)
    }

    function handleShow() {
        setShow(!show)
    }

    function handleBackdropClick() {
        if (editingId) setEditingId(null)
        if (show) handleShow()
    }

    function renderContent() {
        const paragraph = showCompletedOnly ? "No completed to-dos yet. Mark to-dos as done to see them here!" : "No to-dos yet. Click the + to add your first task!"
        return toDoList.length === 0 ?
            <p className={"roboto-light text-center text-muted my-4"}>{paragraph}</p> : toDoElements
    }

    return (<div className={"home-layout"}>
            <div className={"left-pane"}>
                <img src={`${danceGraphic}`} className={"app-image img-fluid"}
                     alt="Illustration of three people dancing"/>
                <div className={"add-container position-sticky bottom-0 py-2"}>
                    <FontAwesomeIcon onClick={handleShow}
                                     className={"add-to-do add-hover d-block mx-auto"}
                                     icon="fa-solid fa-circle-plus"
                                     size={"3x"}/>
                </div>
            </div>

            <div className={"right-pane"}>
                <h1 className={"hachi-maru-pop-regular rich-black mb-3"}>To Do+</h1>
                <main className={"to-do-item-container"}>
                    {renderContent()}
                </main>
            </div>

            {show && (<AddToDoForm setCount={setCount}
                                   addToDo={addToDoItem}
                                   isLoggedIn={isLoggedIn}
                                   handleShow={handleShow}
                                   handleBackdropClick={handleBackdropClick}/>)}
            {editingId && (<EditToDoForm entry={entry}
                                         setCount={setCount}
                                         editingId={editingId}
                                         isLoggedIn={isLoggedIn}
                                         handleShow={handleShow}
                                         editToDo={editToDoItem}
                                         handleBackdropClick={handleBackdropClick}/>)}
        </div>)
}