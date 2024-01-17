import styles from './index.module.css'
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import PostList from '../../features/post/post_list/post_list';
import AddPostInput from '../../features/post/post_add_input/post_add_input'
import { Post } from '../../models/general';
import { useState } from 'react';


function Home() {

    const [posts, setPosts] = useState<Post[]>([])


    return (
        <>
            <DialogConatiner setPosts={setPosts}> </DialogConatiner>

            <div className={styles.page_container}>
                <div className={styles.inside__container}>
                    <AddPostInput></AddPostInput>
                    <PostList {...{ setPosts, posts }}></PostList>
                </div>
            </div>

        </>
    );
}

export default Home;