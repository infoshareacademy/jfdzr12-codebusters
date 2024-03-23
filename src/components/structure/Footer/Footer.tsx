import { useContext } from "react";
import classnames from "classnames";
import styles from "./Footer.module.css";
import { ModeContext } from "@/providers/mode";



export const Footer = () => {
    const { mode, } = useContext(ModeContext);

    return (
        <div className={classnames(styles["footer"], styles[mode])}>
            <div className={classnames(styles["sb_footer section_padding"], styles[mode])}>
                <div className={classnames(styles["sb_footer-links"], styles[mode])}>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h4>Company</h4>
                        <a href="/about"></a>
                        <p>About</p>
                        <a href="/career"></a>
                        <p>Career</p>
                        <a href="/contact"></a>
                        <p>Contact</p>
                    </div>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h4>Partners</h4>
                        <a href="/https://infoshareacademy.com/kursy/">Infoshare Academy</a>
                    </div>
                    <div className={classnames(styles["sb_footer-links-div"], styles[mode])}>
                        <h4>Coming soon</h4>
                        <div className={classnames(styles["socialmedia"], styles[mode])}>
                            <p><img src={fb} alt="" /></p>
                            <p><img src={insta} alt="" /></p>
                            <p><img src={twitter} alt="" /></p>
                            <p><img src={linkedin} alt="" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
