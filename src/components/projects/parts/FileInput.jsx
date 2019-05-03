import React from "react";

export default function FileInput(props) {
  let style = {
    backgroundImage: `url(${props.backgroundImage})`
  };

  function handleDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.types[0] !== "Files")
      return;

    let file = e.dataTransfer.files[0];

    props.onImageAdded(file);
  }

  function handleDrag(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    let file = e.target.files[0];

    if (!file)
      return;

    props.onImageAdded(e.target.files[0]);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    props.onImageDeleted();
  }

  return (
    <label htmlFor="file" className="file-input" onDrop={handleDrop} onDragOver={handleDrag}>
      <input type="file" name="file" id="file" className="file-input_field" onChange={handleChange} hidden />
      <div className="file-input_button">Choose a file...</div>
      {
        props.imageName &&
        <div className="file-input_file">
          <div className="file-input_file-name">{props.imageName}</div>
          <i className="fa fa-times fa-lg file-input_file-delete" onClick={handleDeleteClick} ></i>
          <div className="file-input_background" style={style}></div>
        </div>
      }
      {
        props.isDragged &&
        <div className="file-input_drag">
          <i className="fa fa-archive fa-lg"></i>
          <span className="file-input_drag-text">Drop image here</span>
        </div>
      }
    </label>
  );
}