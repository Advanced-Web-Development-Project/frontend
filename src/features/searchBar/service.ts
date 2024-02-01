import { Post } from "../../models/general";

export const sortHotPostsMethod = (a: Post, b: Post): number => {

    const calculateScore = (post: Post) => post.likes.length - post.dislikes.length;

    const scoreA = calculateScore(a);
    const scoreB = calculateScore(b);

    return scoreB - scoreA;
};
