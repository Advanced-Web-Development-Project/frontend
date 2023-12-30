
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { ArrowUpward, ArrowDownwardRounded, ArrowUpwardSharp, ArrowDownward, ArrowBackIosNew } from '@mui/icons-material/';


interface PostLikeBoxProps {
    likes: string[],
}

function PostLikeBox({ likes }: PostLikeBoxProps) {


    return (
        <div className={styles.container}>
            <IconButton className={styles.navbar_home_icon}>
                <ArrowUpwardSharp fontSize='small' />
            </IconButton>
            <div>{likes.length}</div>
            <IconButton className={styles.navbar_home_icon}>
                <ArrowDownward fontSize='small' />
            </IconButton>
        </div>
    )
}

export default PostLikeBox;