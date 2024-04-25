import classnames from "classnames";
import styles from "./Footer.module.css";
import fb from '/images/icons/footer/facebook.png'
import twitter from '/images/icons/footer/twitter.png'
import linkedin from '/images/icons/footer/linkedin.png'
import insta from '/images/icons/footer/instagram.png'
import { Link } from "react-router-dom";
import { User } from "firebase/auth";
import { useMode } from "@/providers/mode";
interface FooterProps {
    user: User | null;
}

export const Footer = ({ user }: FooterProps) => {
    const { mode, } = useMode();

    return (
        <div className={classnames(styles["footer"], styles[mode])}>
            <div className={classnames(styles["sb_footer-section_padding"], styles[mode])}>
                <div className={classnames(styles["sb_footer-links"], styles[mode])}>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h3>Company</h3>
                        <Link className={classnames(styles["sb_footer-below-links-pages"], styles[mode])} to="/">
                            Home</Link>
                        <Link className={classnames(styles["sb_footer-below-links-pages"], styles[mode])} to="/about">
                            About</Link>
                        <Link className={classnames(styles["sb_footer-below-links-pages"], styles[mode])} to="/contact">
                            Contact</Link>
                        {user && <>
                            <Link className={classnames(styles["sb_footer-below-links-pages"], styles[mode])} to="/account">
                                Account</Link>
                        </>}
                    </div>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h3>Partners</h3>
                        <a target="_blank" className={classnames(styles["sb_footer-below-links-policy"], styles[mode])}
                            href="https://infoshareacademy.com/">infoShare Academy</a>
                    </div>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h3>Let be friends!</h3>
                        <div className={classnames(styles["socialmedia"], styles[mode])}>
                            <p><a target="_blank" href="https://www.facebook.com/infoshareacademy/"> <img src={fb} alt="Facebook link" /></a></p>
                            <p><a target="_blank" href="https://www.instagram.com/infoshareacademy/"><img src={insta} alt="Instagram link" /></a></p>
                            <p><a target="_blank" href="https://twitter.com/infoshareaca"><img src={twitter} alt="Twitter link" /></a></p>
                            <p><a target="_blank" href="https://www.linkedin.com/school/infoshare-academy/"><img src={linkedin} alt="Linkedin link" /></a></p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className={classnames(styles["sb_footer-below"], styles[mode])}>
                    <div className={classnames(styles["sb_footer-copyright"], styles[mode])}>
                        <p>
                            @{new Date().getFullYear()} Diary-Daze All rights reserved. &copy;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
