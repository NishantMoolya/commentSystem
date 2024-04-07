import React from 'react'
import '../styles/avatar.css'

const Avatar = ({ size,author }) => {
    const findColor = (name) => {
      try{

        let hash = 0;
        let i;
        for (i = 0; i < name.length; i += 1) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        
        let letters = "";
        name.split(" ").forEach(val => {
          letters+=val[0];
        });
        return {color,letters};
      }catch(err){
        console.log("provide user name");
        return { color:"#800080",letters:"?"}
      }
    }
  let { color,letters } = findColor(author);
  const style = {
    height: `${size}rem`,
    width: `${size}rem`,
    backgroundColor: `${color}`,
    fontSize:`${size-0.5}rem`
  }  
  return (
    <div className='avatar_frame' style={style}>
        <h4>{letters}</h4>
    </div>
  )
}

export default Avatar