import { Comment, Reply } from '@mui/icons-material';
import { Avatar, Badge, Box, Grid, IconButton, Typography } from '@mui/material'
import { deepPurple, green, grey } from '@mui/material/colors';
import React, { useState } from 'react'
import Input from './Input'
import { stringAvatar } from '../utilities/stringConverters';

const SingleReply = ({ parent,reply }) => {
  const [show, setShow] = useState(0);
  const [inputBox, setInputBox] = useState(false);
  const [childReply,setChildReply] = useState({
    name:"vijay choudhari",
    content:""
  });
  const [childReplyData,setChildReplyData] = useState(reply.child);
  const handleInput = (e) => {
    const { value,name } = e.target;
    setChildReply(prev => ({...prev,[name]:value}));
  }
  const addReply = () => {
    setChildReplyData(prev => [childReply,...prev]);
    setChildReply(prev => ({...prev,content:''}));
    setInputBox(false);
  }
  return (
    <Box sx={{ borderLeft:1,borderColor:'grey',pt:1,pl:1}}>
        <Grid container gap={1} sx={{ bgcolor:grey[100],borderRadius:2,p:1}}>
          <Grid item alignSelf={'flex-start'}><Avatar variant='circle' alt={reply.name} {...stringAvatar(reply.name)} sx={{ height:35,width:35}} /></Grid>
          <Grid item flex={1}>
            <Grid container flexDirection={'column'}>
              <Grid item>
                <Typography variant='caption'>{reply.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant={{xs:'body2',sm:'body1'}}>{reply.content}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {parent && <>
          <Grid item alignSelf={'flex-end'}>
          <IconButton aria-label="reply" onClick={() => {setInputBox(prev => !prev)}}>
                  <Reply />
          </IconButton>
          </Grid>
          <Grid item alignSelf={'flex-end'}>
          <Badge badgeContent={show}>
            <Comment />
          </Badge>
          </Grid>
          </>}
        </Grid>
        {inputBox && <Input input={childReply} handleInput={handleInput} addReply={addReply} />}
        {childReplyData?.map((reply,ind) => {
          return(
            <Box sx={{ ml:2 }} key={ind}><SingleReply reply={reply} parent={false} /></Box>
            )
          })}
    </Box>
  )
}

export default SingleReply