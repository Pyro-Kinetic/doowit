import {v4 as uuidv4} from "uuid";

export default function AddToDoForm({addToDo}) {

    function submitToDoData(formData) {
        const allData = Object.fromEntries(formData)
        console.log(allData)
        addToDo(allData)
    }

    return (
        <section>
            <h1>To Do+</h1>
            <form action={submitToDoData}>
                <input className={"d-none"} type={"text"} name={"id"} defaultValue={uuidv4()}/>

                <label htmlFor={"title"}>Title</label>
                <input id={"title"} type={"text"} name={"title"} placeholder={"Add a new task..."}/>

                <label htmlFor={"description"}>Description</label>
                <textarea id={"description"}
                          name={"description"}
                          placeholder={"Enter task description (e.g., Email Sarah the revised contract terms by Friday)"}></textarea>

                <fieldset>
                    <legend>Priority</legend>

                    <label htmlFor={"small"}>Small</label>
                    <input id={"small"} type={"radio"} name={"priority"} defaultChecked={true} value={"moon"}/>

                    <label htmlFor={"medium"}>Medium</label>
                    <input id={"medium"} type={"radio"} name={"priority"} value={"planet"}/>

                    <label htmlFor={"large"}>Large</label>
                    <input id={"large"} type={"radio"} name={"priority"} value={"sun"}/>
                </fieldset>

                <button>Add+</button>
            </form>
        </section>
    )
}