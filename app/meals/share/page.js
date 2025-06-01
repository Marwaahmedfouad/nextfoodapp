'use client'
import { useFormState } from "react-dom";
import ImagePicker from "../../../components/meals/image-picker";
import { shareMeal } from "../../../lib/action";
import MealsFormSubmit from "../meals-form-submit";
import classes from "./page.module.css";
import { useActionState } from "react";

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Let your unique flavors inspire our community</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Chef's Name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Chef's Email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Recipe Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Taste Description</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Cooking Journey </label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          {/* IMAGE PICKER */}
          <ImagePicker label="your image" name="image" />
          <p className={classes.actions}>
            {/* <button type="submit">Share Meal</button> */}
            {state.message && <p>{state.message}</p>}
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
