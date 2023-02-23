import React from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const PostCard = ({postData, colorVariation, triggerLikePost, triggerDeletePost}) => {

  const userID = JSON.parse(localStorage.getItem('userProfile')).userId

  return (
    <div className={`post-card post-card-${colorVariation}`}>
        <div className='post-card-content'>
            <Tooltip title={postData.name}>
               <img src={`/images/avatars/${postData.thumbnail}.png`}></img>
            </Tooltip>
            <span className={`post-color-${colorVariation}`} >{postData.post}</span>
        </div>
        <div className={`post-card-footer post-card-footer-${colorVariation}`}>
            <div className="react-info">
                <img src={ postData.likes.find((id) => id === userID) ? `/images/assets/heart-filled.png` :`/images/assets/heart-blank.png`} onClick={() => triggerLikePost(postData.id, userID)}></img>
                <span>{postData.likes.length}</span>
            </div>
            {
                postData.userId === userID ?
                    <Tooltip title="Delete">
                        <IconButton sx={{marginTop: "10px"}} aria-label="delete" onClick={() => triggerDeletePost(postData.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                : null
            }
        </div>

    </div>
  )
}

export default PostCard