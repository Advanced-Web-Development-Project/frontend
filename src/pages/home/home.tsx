import styles from './index.module.css'
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import PostList from '../../features/post/post_list/post_list';
import AddPostInput from '../../features/post/post_add_input/post_add_input'
import { DialogPage, Post, PostCategory } from '../../models/general';
import { useEffect, useState } from 'react';
import SearchBar from '../../features/searchBar/SearchBar';
import LoadingSpinner from '../../gen_components/LoadingSpinner';
import { getAllPostsAPI, getAllPostsByCategoryAPI } from '../../api/post_api';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useDialogContext } from '../../contexts/PageContext';
import { usePostCategoryContext } from '../../contexts/CategoryContext';



function Home() {

    const [posts, setPosts] = useState<Post[]>([])
    const [originalPosts, setOriginalPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const { page } = useDialogContext()

    const { category } = usePostCategoryContext()

    const fetchData = async () => {
        try {
            const postsData = await getAllPostsByCategoryAPI(category)
            setPosts(postsData)
            setOriginalPosts(postsData)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        if (page === DialogPage.None)
            fetchData();
    }, [page])

    useEffect(() => {
        try {
            setLoading(true)
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [])

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