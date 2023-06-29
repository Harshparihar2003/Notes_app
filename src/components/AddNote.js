import React , {useContext, useState} from 'react'
import noteContext from '../context/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setnote] = useState({title : "" , description: "", tag:""})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setnote({title : "" , description: "", tag:""})
    }
    const onchange= (e)=>{
        setnote({...note , [e.target.name]: e.target.value})
    }
  return (
    
    <div className='container my-4'>
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} name="title" onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onchange}  minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onchange} minLength={5} required/>
        </div>
        <button disabled= {note.title.length<5 || note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
      </form>
      </div>
  )
}

export default AddNote
