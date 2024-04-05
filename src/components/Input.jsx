import { Send } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { stringAvatar } from '../utilities/stringConverters'

const Input = ({ input,handleInput,addReply }) => {

  return (
    <Box sx={{ m:1 }}>
        <Grid container direction={'column'} justifyContent={'center'} p={1} gap={1}>
            <Grid item>
                <Grid container alignItems={'center'} gap={1}>
                    <Grid item>
                        <Avatar variant='circular' alt={input.name} {...stringAvatar(input.name)}></Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' >{input.name}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item bgcolor={grey[100]} borderRadius={1}>
                <Grid container direction={'column'}>
                    <Grid item bgcolor={grey[200]} p={1} borderRadius={1}>
                        <Typography variant='body2'>Write here something...</Typography>
                    </Grid>
                    <Grid item>
                        <textarea  name='content' value={input.content} onChange={(e) => handleInput(e)} style={{ resize:"none",width:'96%',outline:'none',border:'none',background:'transparent',marginInline:"10px",fontSize:'1.2rem'}} rows={3} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item alignSelf={'flex-end'}>
                <Button variant='' size='small' endIcon={<Send />} onClick={() => addReply()}>Reply</Button>
            </Grid>
        </Grid>
    </Box>
  )
}

export default Input