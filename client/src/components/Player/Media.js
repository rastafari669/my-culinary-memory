import React from 'react';
import ReactPlayer from 'react-player';

function Media({postVid}) {
  return (
    <div  >
    <ReactPlayer 
    controls 
    width='100%'
    url={postVid ? postVid : 'https://www.youtube.com/watch?v=7sDY4m8KNLc&t=283s'}/>
    </div>
  )
}

export default Media