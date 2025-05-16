import Image from "next/image";
import { notFound } from "next/navigation";
import { getMeal } from "../../../lib/meals";
import classes from "./page.module.css";

export default function MealDetailsPage({ params }) {
  //incase i want take segemtet from url or id from url
  // console.log(params.mealSlug);
  //to get all data or destruct data which you want it {id,slug,title,image,summary,instructions,creator,creator_email}
  // console.log(meal);
  const meal = getMeal(params.mealSlug);

  // call notFound a special fn that proviser by nextjswhich imported from next/navigation
  //calling this function will stop this component from excuting and will show the closet not-found or error page
  if (!meal) {
    notFound();
  }

  // - \n → Represents a newline in a string (i.e., when you press "Enter").
  // - /\n/g → A regular expression that finds all occurrences of \n.
  // - /\n/ → Matches a single newline.
  // - g (global flag) → Ensures all newlines are replaced (not just the first one).
  // - "<br />" → The replacement HTML tag that creates line breaks in rendered HTML.
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            {/* The mailto: inside the <a> tag is used to create an email link. When a user clicks on this link, it opens their default email client */}
            {/* You should use mailto: when you want to allow users to send an email by clicking a link */}
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        {/* dangerouslySetInnerHTML={{ __html: meal.instructions }}
             - The __html property tells React to insert the HTML as actual HTML, not plain text.
             - Without dangerouslySetInnerHTML, React would escape the HTML and display it as text. */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
