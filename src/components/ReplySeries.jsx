import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import SingleReply from './SingleReply'

const ReplySeries = ({ replyData }) => {
  useEffect(() => {

  },[]);
  return (
    <Box>
        {
            replyData.map((reply,ind) => {
            return(
                <SingleReply reply={reply} key={ind} parent={reply.parent} />
            )})
        }
    </Box>
  )
}

export default ReplySeries