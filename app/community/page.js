import Image from "next/image";

import mealIcon from "../../assets/icons/meal.png";
import communityIcon from "../../assets/icons/community.png";
import eventsIcon from "../../assets/icons/events.png";
import styles from "./page.module.css";

export default function CommunityPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Where Culinary Dreams Come Alive:{" "}
          <span className={styles.highlight}>Your Kitchen Stories</span>
            Where Every Dish Tells a Story
        <p>Join our vibrant community of passionate food enthusiasts</p>
        </h1>
        <p>
          Join our vibrant community of culinary artists and flavor innovators
        </p>
      </header>
      <main className={styles.main}>
        <h2>Experience the Magic</h2>

        <ul className={styles.perks}>
          <li>
            <Image src={mealIcon} alt="A delicious meal" />
            <p>Create & Explore Culinary Masterpieces</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p>Connect with Fellow Food Enthusiasts</p>
          </li>
          <li>
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Join Exclusive Culinary Adventures</p>
          </li>
        </ul>
      </main>
    </>
  );
}
