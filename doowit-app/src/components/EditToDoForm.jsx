export default function EditToDoForm({editToDo, editingId, entry}) {
    function submitEditedData(formData) {
        const allData = Object.fromEntries(formData)
        editToDo(editingId, allData)
    }


    return (<section>
        <h1>Editing...</h1>
        <form action={submitEditedData}>
            {/* keep fields minimal; id comes from editingId */}

            <label htmlFor={"title"}>Title</label>
            <input id={"title"} type={"text"} name={"title"} defaultValue={entry.title}/>

            <label htmlFor={"description"}>Description</label>
            <textarea id={"description"}
                      name={"description"}
                      defaultValue={entry.description}></textarea>

            <fieldset>
                <legend>Priority</legend>

                <label htmlFor={"small"}>Small</label>
                <input id={"small"} type={"radio"} name={"priority"} defaultChecked={true} value={"moon"}/>

                <label htmlFor={"medium"}>Medium</label>
                <input id={"medium"} type={"radio"} name={"priority"} value={"planet"}/>

                <label htmlFor={"large"}>Large</label>
                <input id={"large"} type={"radio"} name={"priority"} value={"sun"}/>
            </fieldset>

            <button>Save</button>
        </form>
    </section>)
}