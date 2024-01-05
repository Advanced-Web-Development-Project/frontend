import styles from './index.module.css'
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import PostList from '../../features/post/post_list/post_list';
import AddPostInput from '../../features/post/post_add_input/post_add_input'


function Home() {


    return (
        <>
            <DialogConatiner> </DialogConatiner>

            <div className={styles.page_container}>
                <div className={styles.inside__container}>
                    <AddPostInput></AddPostInput>
                    <PostList></PostList>
                </div>
            </div>

        </>
    );
}

export default Home;