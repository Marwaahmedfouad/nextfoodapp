"use client";

import Link from "next/link";
import Image from "next/image";
import { deleteMealAction } from "../../lib/action";
import { useState } from "react";

import classes from "./meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
  const [showAlert, setShowAlert] = useState(false);

  async function handleDelete() {
    setShowAlert(true);
  }

  async function confirmDelete() {
    try {
      await deleteMealAction(slug);
      setShowAlert(false);
    } catch (error) {
      console.error("Error deleting meal:", error);
      setShowAlert(false);
    }
  }

  function cancelDelete() {
    setShowAlert(false);
  }
  return (
    <>
      <article className={classes.meal}>
        <header>
          <div className={classes.image}>
            <Image src={image} alt={title} fill />
          </div>
          <div className={classes.headerText}>
            <h2>{title}</h2>
            <p>by {creator}</p>
          </div>
        </header>
        <div className={classes.content}>
          <p className={classes.summary}>{summary}</p>
          <div className={classes.actions}>
            <Link href={`/meals/${slug}`} className={classes.viewButton}>
              Explore Recipe
            </Link>
            <button onClick={handleDelete} className={classes.deleteButton}>
              Remove Recipe
            </button>
          </div>
        </div>
      </article>

      {showAlert && (
        <>
          <div className="alert-overlay" onClick={cancelDelete}></div>
          <div className="alert-dialog">
            <h2>Confirm Recipe Removal</h2>
            <p>
              Would you like to remove this culinary creation from your
              collection?
            </p>
            <div className="alert-dialog-buttons">
              <button onClick={confirmDelete}>Yes, Remove</button>
              <button onClick={cancelDelete}>Keep Recipe</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
