import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage"
import {useState} from "react";

function App() {
    const [showHomePage, setShowHomePage] = useState(true)
    const [showContactPage, setShowContactPage] = useState(false)

    function togglePages() {
        setShowHomePage(!showHomePage)
        setShowContactPage(!showContactPage)
    }

    return (
        <div className={"container"}>
            <div className="d-flex justify-content-between mt-3">
                <h1 className={"hachi-maru-pop-bold rich-black"}>Doowit!</h1>
                {showHomePage && (<button onClick={togglePages} className="btn bg-gradient bg-opacity-75 roboto sun-background rich-black">Contact</button>)}
                {showContactPage && (<button onClick={togglePages} className="btn bg-gradient bg-opacity-75 roboto sun-background rich-black">Home</button>)}
            </div>
            {showHomePage && (<HomePage/>)}
            {showContactPage && (<ContactPage/>)}
        </div>
    );
}

export default App;
