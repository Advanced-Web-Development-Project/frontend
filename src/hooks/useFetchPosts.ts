import { useState, useEffect } from 'react';
import { Post } from '../models/general';
import { getAllPostsAPI } from '../api/post_api';

const useFetchPosts = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [originalPosts, setOriginalPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const postsData = await getAllPostsAPI();
                setPosts(postsData);
                setOriginalPosts(postsData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { posts, originalPosts, loading, setPosts, setLoading, setOriginalPosts };
};

export default useFetchPosts;