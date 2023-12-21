import { Box } from '@mui/material'
import React from 'react'
import SingleReply from './SingleReply'

const ReplySeries = () => {
  return (
    <Box>
        {
            Array(5).fill(0).map((ele,ind) => {
            return(
                <SingleReply />
            )})
        }
    </Box>
  )
}

export default ReplySeries