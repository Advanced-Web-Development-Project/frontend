import styles from './index.module.css'
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import PostList from '../../features/post/post_list/post_list';
import AddPostInput from '../../features/post/post_add_input/post_add_input'
import { Post } from '../../models/general';
import { useState } from 'react';
import SearchBar from '../../features/searchBar/SearchBar';
import LoadingSpinner from '../../gen_components/LoadingSpinner';



function Home() {

    const [posts, setPosts] = useState<Post[]>([])
    const [originalPosts, setOriginalPosts] = useState<Post[]>([])

    const [loading, setLoading] = useState(false)

    return (
        <>
            <DialogConatiner setPosts={setPosts}> </DialogConatiner>

            <div className={styles.page_container}>
                {
                    loading ? <LoadingSpinner></LoadingSpinner>
                        : <div className={styles.inside__container}>
                            <AddPostInput {...{ posts }}></AddPostInput>
                            <SearchBar {...{ setPosts, posts, setOriginalPosts, originalPosts }}></SearchBar>
                            <PostList {...{ setPosts, posts, setOriginalPosts, originalPosts, setLoading }}></PostList>
                        </div>
                }

            </div>

        </>
    );
}

export default Home;