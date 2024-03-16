import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Comment, CommentDB, DialogPage, Post } from "../../models/general";
import PostLikeComment from "../../features/post/post_like_comment/post_like_comment";
import no_image from "./../../pictures/no_image.jpg";
import PostLikeBox from "../../features/post/post_like_box/post_like_box";
import { useLocation, useNavigate } from "react-router-dom";
import PostBoxTitle from "../../features/post/post_box_title/post_box_title";
import { timeAgo } from "../../features/post/serviec";
import { Button, IconButton, TextField } from "@mui/material";
import { createComment, getCommentsByPost } from "../../api/commnet_api";
import { useAuth } from "../../contexts/AuthContexts";
import UserComment from "./../../features/comment/Comment";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSpecifcPostContext } from "../../contexts/SpecificPostContext";
import { useDialogContext } from "../../contexts/PageContext";
import ConfirmationDialog from "./delete_post_alert";
import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import EditPostDialog from "./edit_post_dialog";
import EditPostButton from "./EditPostButton";

interface PostPageProps { }

function PostPage({ }: PostPageProps) {

  const [text, setText] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [currComments, setCurrComments] = useState<Comment[]>([]);

  const { open, handleClose, handleOpen } = useConfirmationDialog()

  const { user: userLoggedIn } = useAuth();
  const { setErrorMessage } = useErrorContext();
  const { specifcPost, setSpecificPost } = useSpecifcPostContext();
  const { setPage } = useDialogContext();

  useEffect(() => {
    if (!specifcPost) return;
    getComments();
  }, []);

  if (!specifcPost) return <></>;

  const {
    title,
    createdAt,
    postId,
    username,
    imagePath,
  } = specifcPost;

  const postTimestep = timeAgo(new Date(createdAt).getTime());
  const info = `Posted by ${username} ${postTimestep}`;

  const getComments = async () => {
    const response: Comment[] = await getCommentsByPost(specifcPost.postId);
    setCurrComments(response);
  };

  const closePage = () => {
    setPage(DialogPage.None);
  };

  const handleCommentClicked = async () => {
    if (!userLoggedIn) {
      setErrorMessage("You have to log in to comment on a post");
      return;
    }

    try {
      const comment: CommentDB = await createComment(postId, {
        content: text,
        username: userLoggedIn.username,
      });
      setCurrComments([...currComments, comment]);
      setShowComments(true);
      setText("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowComment = async () => {
    setShowComments(!showComments);
  };

  const onAcceptToDeletePost = () => {
    // close all open dialog When post deleted
    handleClose();
    closePage();
  }
  const isPostOwnedByUser = userLoggedIn && userLoggedIn.posts.find(postId => postId === specifcPost.postId) !== undefined

  const computedImagePath = `${process.env.REACT_APP_SERVER_URL_DEV}/${imagePath}`;

  return (
    <>
      <div className={styles.container}>

        <ConfirmationDialog message="Post is being deleted.." postId={postId} open={open} onAccept={onAcceptToDeletePost} onCancel={handleClose} />
        <EditPostDialog post={specifcPost}></EditPostDialog>

        <div className={styles.headline}>
          <div className={styles.left_header}>
            <PostLikeBox
              post={specifcPost}
              setPost={setSpecificPost}
              style={{ backgroundColor: "white" }}
            />
            <PostBoxTitle {...{ info, title }}></PostBoxTitle>
          </div>

          <IconButton className={styles.closeIcon} onClick={closePage}>
            X
          </IconButton>
        </div>

        <div style={{ padding: 20, paddingTop: 5 }}>{specifcPost.content}</div>
        <img
          className={styles.image}
          src={computedImagePath}
          alt="Circular Avatar"
        />

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          paddingTop: 5,
        }}
        >
          <PostLikeComment
            {...{ type: "SHOW", handleShowComment, comments: currComments }}
          ></PostLikeComment>
          {isPostOwnedByUser && <div>
            <EditPostButton />
            <Button color="error" onClick={() => handleOpen()}>Delete Post</Button>
          </div>
          }
        </div>

        <div className={styles.comments_container}>
          {showComments ? (
            <div className={styles.comments_area}>
              {currComments.map((comment) => {
                return (
                  <div className={styles.comment_wrapper}>
                    <UserComment
                      {...{ setCurrComments, currComments, comment, postId }}
                      key={comment.commentId}
                    />
                    <div className={styles.devider}></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>

        <TextField
          className={styles.wide_text_box}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          multiline
          rows={4}
          maxRows={10}
        />
        <div className={styles.comment_button}>
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={handleCommentClicked}
          >
            Comment
          </Button>
        </div>



      </div>
    </>
  );
}

export default PostPage;
