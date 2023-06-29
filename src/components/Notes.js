import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const ref = useRef(null)
    const closeRef = useRef(null)
    const context = useContext(noteContext)
    let navigate = useNavigate();
    const { notes, getAllNotes, editNote} = context;
    const [note, setnote] = useState({ id:"" ,etitle: "", edescription: "", etag: "default" })
    useEffect(() => {
        if(localStorage.getItem("token")){
            getAllNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const handleClick = (e) => {
        console.log("Updating a note")
        editNote(note.id, note.etitle, note.edescription, note.etag)
        e.preventDefault();
        closeRef.current.click()
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    // console.log("my notes " , notes)

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name="etitle" onChange={onchange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name="etag" id="etag" onChange={onchange} value={note.etag} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} disabled= {note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h1>Your notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
