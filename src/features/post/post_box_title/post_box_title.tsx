
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { CommentTwoTone } from "@mui/icons-material";


interface PostBoxTitleProps {
    title: string,
    info: string
}

function PostBoxTitle({ info, title }: PostBoxTitleProps) {



    return (
        <div>

            <div className={styles.card__title}>
                {title}
            </div>
            <div className={styles.card__subTitle}>
                {info}
            </div>
        </div>



    )
}

export default PostBoxTitle;