"use client";
const { useFormStatus } = require("react-dom");

import React from "react";

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();
  //   console.log(pending);

  return <button disabled={pending}>{pending ? "submitting.... " : "ShareMeal"}</button>
}
