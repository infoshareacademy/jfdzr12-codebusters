import { useContext } from "react";
import classnames from "classnames";
import styles from "./Footer.module.css";
import { ModeContext } from "@/providers/mode";
import fb from '/images/icons/footer/facebook.png'
import twitter from '/images/icons/footer/twitter.png'
import linkedin from '/images/icons/footer/linkedin.png'
import insta from '/images/icons/footer/instagram.png'

export const Footer = () => {
    const { mode, } = useContext(ModeContext);

    return (
        <div className={classnames(styles["footer"], styles[mode])}>
            <div className={classnames(styles["sb_footer section_padding"], styles[mode])}>
                <div className={classnames(styles["sb_footer-links"], styles[mode])}>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h3>Company</h3>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/about"></a>
                        <p>About</p>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/career"></a>
                        <p>Career</p>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/contact"></a>
                        <p>Contact</p>
                    </div>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h3>Partners:</h3>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/https://infoshareacademy.com/kursy/">Infoshare Academy</a>
                    </div>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h3>Coming soon</h3>
                        <div className={classnames(styles["socialmedia"], styles[mode])}>
                            <p><img src={fb} alt="Facebook link" /></p>
                            <p><img src={insta} alt="Instagram link" /></p>
                            <p><img src={twitter} alt="Twitter link" /></p>
                            <p><img src={linkedin} alt="Linkedin link" /></p>
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
                    <div className={classnames(styles["sb_footer-below-links"], styles[mode])}>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/terms"><div><p>Terms & Conditions</p></div></a>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/security"><div><p>Security</p></div></a>
                        <a className={classnames(styles["sb_footer-below-links-policy"], styles[mode])} href="/cookie"><div><p>Cookie declaration</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    );
};
