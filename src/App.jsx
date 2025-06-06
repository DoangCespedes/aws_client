import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [post, setPost] = useState({ title: '', photo: null });
  const [filename, setFilename] = useState(null);
  const [text, setText] = useState(null);


  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', post.photo);

    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    setFilename(response.data.filename);
    console.log('Archivo subido, filename:', response.data.filename);
  }

  const handleProcesar = async () => {
    if (!filename) {
      alert('Primero sube una imagen');
      return;
    }
    const res = await axios.post('http://localhost:3000/procesar2', { filename });
    setText(res.data.texto)
    alert('Texto detectado: ' + res.data.texto);
  }

  return (
    <>
      <div>
        <h1>Subiendo a S3 y detectando texto</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='title'
            onChange={e => setPost({...post, title: e.target.value})}
          />
          <input 
            type='file' 
            name='photo'
            onChange={e => setPost({...post, photo: e.target.files[0]})}
          />
          <button type='submit'>Subir</button>
        </form>
        <button onClick={handleProcesar}>Procesar Imagen</button>
      </div>

      <div>
        <p>
          {text}
        </p>
      </div>
    </>
  )
}

export default App;