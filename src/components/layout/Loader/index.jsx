import styles from './Loader.module.scss';
import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <PuffLoader 
                color="#ffff"
                loading={true}
                size={150}
            />
        </div>
    )
}

export default Loader
