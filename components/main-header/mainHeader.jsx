import Link from "next/link";
import React from "react";
import Image from "next/image";
import MainHeaderBackground from "./mainHeaderBackground";
import logoImg from "../../app/logo.png";
import styles from "./mainHeader.module.css";
import NavLink from "./nav-link";
function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          {/* <Image src={logoImg} alt="Logo" width={100} height={50} /> */}
          <Image
            src={logoImg}
            // fill
            quality={100}
            alt="The Wild Oasis Logo"
            // className="object-cover"
            priority
          />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals"> Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community"> Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
