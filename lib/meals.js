import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

// export async function getMeals() {
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//     return db.prepare('SELECT * FROM meals').all();
// }

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const meals = db.prepare("SELECT * FROM meals").all();
  const countStmt = db.prepare("SELECT COUNT(*) AS count FROM meals");
  const { count } = countStmt.get();
  console.log(`Total meals before seeding: ${count}`);
  console.log(meals);
  return meals;
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  // Handle image
  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;
  // Path relative to project root
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("saving image failed");
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES 
    (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)`
  ).run(meal);
}

export async function deleteMeal(slug) {
  const meal = getMeal(slug);
  if (!meal) {
    throw new Error("Meal not found");
  }

  // Delete the image file if it exists
  if (meal.image) {
    const imagePath = `public${meal.image}`;
    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }

  // Delete the meal from the database
  db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
}

// export async function saveMeal(meal) {
//   meal.slug = slugify(meal.title, { lower: true });
//   meal.instructions = xss(meal.instructions);
//   // Handle image upload
//   const extension = meal.image.name.split('.').pop();
//   const fileName = `${meal.slug}.${extension}`;

//   const stream = fs.createWriteStream(`public/images/${fileName}`);
//   const bufferedImage = await meal.image.arrayBuffer();

//   stream.write(Buffer.from(bufferedImage), (error) => {
//     if (error) {
//       throw new Error("Saving image failed");
//     }
//   });

//   meal.image = `/images/${fileName}`;

//   db.prepare(
//     `INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES
//     (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)`
//   ).run(meal);
// }
