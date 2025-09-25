import React from "react";
import Image from "next/image";
import style from "./global.module.css";
import Link from "next/link";
import scriptLogo from "../../assets/script-logo.jpg";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";

export default function footer(props) {
  return (
    <div>
      <Image
        className={style.footerLogo}
        src={scriptLogo}
        width={250}
        alt='Shocker Mechanical Inc.'
      ></Image>
      <div className={style.footerMain}>
        <ul className={style.quickLinks}>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
        </ul>
        <div className={style.socials}>
          <Link href={props.data.fields.instagramLink}>
            <Image alt='Instagram' src={instagram}></Image>
          </Link>
          <Link href={props.data.fields.facebookLink}>
            <Image alt='Facebook' src={facebook}></Image>
          </Link>
        </div>
      </div>
      <div className={style.copyright}>
        <div>Shocker Mechanical 2025</div>
      </div>
    </div>
  );
}
