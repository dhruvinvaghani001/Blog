import { Link, useRouteError } from "react-router-dom";
import styles from './errorPage.module.css';


export default function ErrorPage() {
    const error = useRouteError();

    console.log(error.data);
    
    return (
        <div className={styles.container}>
            <div className={styles.gif}>
                <img src="public/images/404.jpg" alt="404 img" width={400} />
            </div>
            <div className={styles.content}>
                <h1 className={styles.mainheading}>This page is gone.</h1>
                <p className={styles.txt}>{error.data} </p>
                <Link to="/">
                    <button className={styles.backhomebtn}>
                        Back to home <i className="far fa-hand-point-right" />
                    </button>
                </Link>
            </div>
        </div>
    );
}