import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
interface PhotoDropZoneProps{
    setPhoto:(photo:any)=>any
}
let PhotoDropZone:React.FC<PhotoDropZoneProps>=({setPhoto})=> {
  const onDrop = useCallback(acceptedFiles => {
    setPhoto(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default PhotoDropZone