"use server"

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
// import { useFormState } from "react-dom";

export async function shareMeal(formData) {
  //  const [state,formAction] = 
  //  useFormState(shareMeal, { message: null });

  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  
  try {
    //send meal for saveMeal function
    await saveMeal(meal);
    redirect("/meals");
  } catch (error) {
    console.error("Failed to save meal:", error);
    throw error; 
  }
  function isInvalidText(text) {
    return !text || text.trim() === '';
  }
  if (isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions)  || isInvalidText(meal.creator)  || isInvalidText(meal.summary)
      || isInvalidText(meal.creator_email)  || !meal.creator_email.includes('@')  
    || !meal.image || meal.image.size === 0 ){
    throw new Error("Invalid input");
    
  }
}