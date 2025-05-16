"use client";

import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  // console.log(imageInput.current);
  const [pickedImage, setPickedImage] = useState(null);
  function handlePickClick() {
    imageInput.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    //multiple file
    // console.log(event.target.files);

    // in that case if there is not a file , i will just return and not continue
    // you should setPickedImage(null) to make sure that the preview is reset
    if (!file) {
      setPickedImage(null);
      return;
    }

    
   const fileReader = new FileReader();
   fileReader.readAsDataURL(file);
   fileReader.onload=()=>{
    setPickedImage(fileReader.result)
   }

  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
      <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
            // multiple
          onChange={handleImageChange}
        ></input>
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
