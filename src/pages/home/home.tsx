import styles from './index.module.css'
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import PostList from '../../features/post/post_list/post_list';
import AddPostInput from '../../features/post/post_add_input/post_add_input'
import { Post } from '../../models/general';
import { useEffect, useState } from 'react';
import SearchBar from '../../features/searchBar/SearchBar';
import MessageBox from '../../gen_components/MessageBox/MessageBox';
import LoadingSpinner from '../../gen_components/LoadingSpinner';
import { useLoading } from '../../contexts/LoadingSpinnerContext';
import useFetchPosts from '../../hooks/useFetchPosts';


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
                            <SearchBar {...{ setPosts, posts, originalPosts }}></SearchBar>
                            <PostList {...{ setPosts, posts, setOriginalPosts, setLoading }}></PostList>
                        </div>
                }

            </div>

        </>
    );
}

export default Home;