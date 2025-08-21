export default function EditToDoForm({editToDo, editingId, entry, handleBackdropClick}) {
    function submitEditedData(formData) {
        const allData = Object.fromEntries(formData)
        editToDo(editingId, allData)
    }


    return (
        <div className="modal-backdrop-custom" onClick={(e) => {
            if (e.target === e.currentTarget) handleBackdropClick();
        }}>
            <section className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="add-todo-title">

                <header className="modal-header">
                    <h1 id="add-todo-title" className="hachi-maru-pop-regular rich-black">To Do+</h1>
                </header>

                <form className="modal-body" action={submitEditedData}>
                    <label htmlFor={"title"} className="roboto">Title</label>
                    <input id={"title"} type={"text"} name={"title"} maxLength={25} defaultValue={entry.title} required/>

                    <label htmlFor={"description"} className="roboto">Description</label>
                    <textarea id={"description"}
                              name={"description"}
                              defaultValue={entry.description}
                              maxLength={150}></textarea>

                    <fieldset className="modal-fieldset">
                        <legend>Priority</legend>

                        <label htmlFor={"small"}>Small</label>
                        <input id={"small"} type={"radio"} name={"priority"} defaultChecked={true} value={"moon"}/>

                        <label htmlFor={"medium"}>Medium</label>
                        <input id={"medium"} type={"radio"} name={"priority"} value={"planet"}/>

                        <label htmlFor={"large"}>Large</label>
                        <input id={"large"} type={"radio"} name={"priority"} value={"sun"}/>
                    </fieldset>

                    <footer className="modal-footer">
                        <button className="btn-primary">Save+</button>
                    </footer>
                </form>

            </section>
        </div>
    )
}