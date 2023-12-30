

import { AxiosResponse } from "axios";
import { Post } from "../models/general";
import { server } from "./index"

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

const convertDates = () => {

} 