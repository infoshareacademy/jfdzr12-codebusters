import classnames from "classnames";
import styles from "./About.module.css";
import { Page } from "@/components/structure/Page/Page";
import { Headline } from "@/components/structure/Headline/Headline";
import { Link } from "react-router-dom";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
import { useMode } from "@/providers/mode";

export const About = () => {
    const { mode, } = useMode();

    return (
        <Page>
            <ButtonBack />
            <Headline text="About Us"></Headline>
            <div className={classnames(styles["about-container"], styles[mode])}>
                <section className={classnames(styles["about-section-container"], styles[mode])}>
                    <div className={classnames(styles["about__paragraph-container"], styles[mode])}>
                        <p className={classnames(styles["about-text"], styles[mode])}>
                            Welcome to our journaling application <span className={classnames(styles["about-text-span"], styles[mode])}> DIARY-DAZE</span>!
                        </p>
                    </div>
                    <div className={classnames(styles["about__image-container"], styles[mode])}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/codebusters-7638e.appspot.com/o/about-photos%2F1.jpeg?alt=media&token=72cf8625-dc07-4290-b9b7-be84f4040def" alt="diary photo" className={classnames(styles["about__image"], styles[mode])} />
                    </div>
                </section>
                <section className={classnames(styles["about-section-container"], styles[mode])}>
                    <div className={classnames(styles["about__image-container"], styles[mode])}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/codebusters-7638e.appspot.com/o/about-photos%2F2.avif?alt=media&token=d7e7ce43-c95a-43ba-ab79-40e6a94fdeba" alt="dairy everyday" className={classnames(styles["about__image"], styles[mode])} />
                    </div>
                    <div className={classnames(styles["about__paragraph-container"], styles[mode])}>
                        <p className={classnames(styles["about-text"], styles[mode])}>
                            Our mission is to provide a simple and intuitive platform for you to record your daily thoughts, experiences, and reflections.
                        </p>
                    </div>
                </section>
                <section className={classnames(styles["about-section-container"], styles[mode])}>
                    <div className={classnames(styles["about__paragraph-container"], styles[mode])}>
                        <p className={classnames(styles["about-text"], styles[mode])}>
                            With our app, you can easily create and edit journal entries.
                        </p>
                    </div>
                    <div className={classnames(styles["about__image-container"], styles[mode])}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/codebusters-7638e.appspot.com/o/about-photos%2F3.avif?alt=media&token=f3791812-cee1-48f0-abec-b895340433ca" alt="laptop" className={classnames(styles["about__image"], styles[mode])} />
                    </div>
                </section>
                <section className={classnames(styles["about-section-container"], styles[mode])}>
                    <div className={classnames(styles["about__image-container"], styles[mode])}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/codebusters-7638e.appspot.com/o/about-photos%2F4.avif?alt=media&token=981fe195-0624-4046-ae6c-92dacc01abc8" alt="travel laptop" className={classnames(styles["about__image"], styles[mode])} />
                    </div>
                    <div className={classnames(styles["about__paragraph-container"], styles[mode])}>
                        <p className={classnames(styles["about-text"], styles[mode])}>
                            Whether you're using journaling as a form of self-expression, personal growth, or simply to keep track of your daily life, we're here to support you on your journey.
                        </p>
                    </div>
                </section>
                <section className={classnames(styles["about-section-container"], styles[mode])}>
                    <div className={classnames(styles["about__paragraph-container"], styles[mode])}>
                        <p className={classnames(styles["about-text"], styles[mode])}>
                            Thank you for choosing our app to be a part of your daily routine.
                        </p>
                    </div>
                    <div className={classnames(styles["about__image-container"], styles[mode])}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/codebusters-7638e.appspot.com/o/about-photos%2F5.avif?alt=media&token=b90296f1-34c9-4f3e-80c5-74ebe369a44d" alt="thank you paper" className={classnames(styles["about__image"], styles[mode])} />
                    </div>
                </section>
                <section className={classnames(styles["about-section-container"], styles[mode])}>
                    <div className={classnames(styles["about__image-container"], styles[mode])}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/codebusters-7638e.appspot.com/o/about-photos%2F6.avif?alt=media&token=0c4f304b-1645-4097-ba90-c0163f395ccb" alt="mails" className={classnames(styles["about__image"], styles[mode])} />
                    </div>
                    <div className={classnames(styles["about__paragraph-container"], styles[mode])}>
                        <p className={classnames(styles["about-text"], styles[mode])}>
                            If you have any questions or feedback, feel free to <Link to="/contact" className={classnames(styles["about__contact-link"], styles[mode])}>contact us</Link>!
                        </p>
                    </div>
                </section>
            </div>
        </Page>

    );
}

