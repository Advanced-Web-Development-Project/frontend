

import { AxiosResponse } from "axios";
import { Comment, CommentDB, Post, PostOnScreen } from "../models/general";
import { server } from "./auth_api"

export const getAllPostsAPI = async (): Promise<Post[]> => {
    const response = await server.get('/posts/');
    const posts = response.data.data
    const postsToSend = posts.map((post: Post) => {
        return {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt)
        } as Post
    })
    return postsToSend
}


export const likePostAPI = async (postId: string, accessToken: string) => {

    const response = await server.patch(`/posts/${postId}/like`, {}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data
}

export const dislikePostAPI = async (postId: string, accessToken: string) => {


    const response = await server.patch(`/posts/${postId}/dislike`, {}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data
}

export const createPost = async (post: PostOnScreen, accessToken: string): Promise<any> => {

    const response = await server.post(`/posts/`, post, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    const postResult: Post = response.data.data

    return {
        ...postResult,
        createdAt: new Date(postResult.createdAt),
        updatedAt: new Date(postResult.updatedAt)
    } as Post

}

export const getSpecificPost = async (postId: string): Promise<Post> => {
    const response = await server.get(`/posts/${postId}`);
    const post = response.data.data
    return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
    } as Post

}

export const getAllPostsByCategory = async (category: string): Promise<Post[]> => {
    const response = await server.get(`/posts/category/${category}`);
    const posts = response.data.data
    const postsToSend = posts.map((post: Post) => {
        return {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt)
        } as Post
    })
    return postsToSend
}

