function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}

function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  let date = new Date();
  console.log(date);
  console.log(date.getTime());
  let d = new Date("2024-04-07T05:45:03.993Z");
  console.log(d.getTime());
  const diff = Date.now() - d.getTime();
  console.log(diff);
  console.log(new Date(Date.now()));
  
  //diff = 60*1000*5;
  module.exports = { stringAvatar }