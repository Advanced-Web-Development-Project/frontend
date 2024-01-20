import styles from './index.module.css'
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import PostList from '../../features/post/post_list/post_list';
import AddPostInput from '../../features/post/post_add_input/post_add_input'
import { Post } from '../../models/general';
import { useEffect, useState } from 'react';
import SearchBar from '../../features/searchBar/SearchBar';
import MessageBox from '../../gen_components/MessageBox/MessageBox';


function Home() {

    const [posts, setPosts] = useState<Post[]>([])
    const [originalPosts, setOriginalPosts] = useState<Post[]>([])

    useEffect(() => {
        console.log(" POST: ", [posts])
    }, [posts])


    return (
        <>
            <DialogConatiner setPosts={setPosts}> </DialogConatiner>

            <div className={styles.page_container}>
                <div className={styles.inside__container}>
                    <AddPostInput></AddPostInput>
                    <SearchBar {...{ setPosts, posts }}></SearchBar>
                    <PostList {...{ setPosts, posts, setOriginalPosts }}></PostList>
                </div>
            </div>

        </>
    );
}

export default Home;