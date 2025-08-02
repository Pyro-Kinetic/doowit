export default function ToDoForm() {

    function submitToDoData(formData) {
        const title = formData.get("title")
        const description = formData.get("description")

        console.log(title)
        console.log(description)
    }

    return (
        <section>
            <h1>To Do+</h1>
            <form action={submitToDoData}>
                <label htmlFor={"title"}>Title</label>
                <input id={"title"} type={"text"} name={"title"} placeholder={"Add a new task..."}/>

                <label htmlFor={"description"}>Description</label>
                <textarea id={"description"}
                          name={"description"}
                          placeholder={"Enter task description (e.g., Email Sarah the revised contract terms by Friday)"}></textarea>

                <fieldset>
                    <legend>Priority</legend>

                    <label htmlFor={"small"}>Small</label>
                    <input id={"small"} type={"radio"} name={"priority"}/>

                    <lable htmlFor={"medium"}>Medium</lable>
                    <input id={"medium"} type={"radio"} name={"priority"}/>

                    <lable htmlFor={"large"}>Large</lable>
                    <input id={"large"} type={"radio"} name={"priority"}/>
                </fieldset>

                <button>Add+</button>
            </form>
        </section>
    )
}