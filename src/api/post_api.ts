

import { AxiosResponse } from "axios";
import { Comment, CommentDB, Post, PostCategory, PostOnScreen } from "../models/general";
import { server } from "./index"

export const getAllPostsAPI = async (): Promise<Post[]> => {
    const response = await server.get('/posts');
    const posts = response.data.data
    return posts
}


export const likePostAPI = async (postId: string) => {

    const response = await server.patch(`/posts/${postId}/like`);

    return response.data
}

export const dislikePostAPI = async (postId: string) => {


    const response = await server.patch(`/posts/${postId}/dislike`);

    return response.data
}

export const createPostAPI = async (post: PostOnScreen): Promise<Post> => {

    const response = await server.post(`/posts/`, post, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    const postResult: Post = response.data.data
    return postResult
}

export const editPostAPI = async (postId: string, post: PostOnScreen): Promise<Post> => {

    const response = await server.put(`/posts/${postId}`, post)
    const postResult: Post = response.data.data
    return postResult
}

export const getSpecificPostAPI = async (postId: string): Promise<Post> => {
    const response = await server.get(`/posts/${postId}`);
    const post = response.data.data
    return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
    } as Post

}

export const getAllPostsByCategoryAPI = async (category: PostCategory): Promise<Post[]> => {

    const response = await server.get(`/posts/category/${category}`);

    const posts: Post[] = response.data.data
    return posts.sort((a, b) => {
        return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    })
}

export const deletePostAPI = async (postId: string) => {

    const response = await server.delete(`/posts/${postId}`);

    return response.data
}

export const refreshAllPostsByCategoryAPI = async (category: PostCategory): Promise<Post[]> => {

    const response = await server.get(`/posts/category/${category}/refresh`);

    const posts: Post[] = response.data.data
    return posts.sort((a, b) => {
        return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    })
}


