import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { sortHotPostsMethod } from './service';
import { Post } from '../../models/general';

interface SearchBarSortByProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function SearchBarSortBy({ posts, setPosts }: SearchBarSortByProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const sortHotPosts = async () => {
        // const posts = await getAllPostsAPI()
        const sortedHotPosts = posts.sort(sortHotPostsMethod)
        setPosts([...sortedHotPosts])
        setAnchorEl(null);
    }

    const sortNewestPosts = async () => {
        // const posts = await getAllPostsAPI()
        const sortedNewestPosts = posts.sort((a, b) => {
            return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        })
        setPosts([...sortedNewestPosts])
        setAnchorEl(null);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='warning'
            >
                Sort By
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={sortHotPosts}>Hot</MenuItem>
                <MenuItem onClick={sortNewestPosts}>New</MenuItem>
            </Menu>
        </>
    )
}

export default SearchBarSortBy
