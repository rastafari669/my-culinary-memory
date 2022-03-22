
import React, { useState } from 'react';
import { useEffect,useCallback } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import { useRef } from 'react';
import useStyles from './styles';



function Map({post}) {
   const mapElement = useRef()
  const [map,setMap] = useState({});
  const classes = useStyles();

  
   
  const [longitude,setLongitude] = useState('')
  const [latitude,setLatitude] = useState('')

 

  useEffect( () =>{

  setLatitude(post.lat)
  setLongitude(post.lng)
   
    let map =  tt.map({
      key: 'yLwCRvH8Lu0ziXl3sqKuMX6l5JM1UWM7',
      container: mapElement.current,
      center: [longitude,latitude],
      stylesVisibility: {
        trafficFlow: true,
        trafficIncidents: true
      },
      zoom: 8
 
     })
     setMap(map)
   
   
    

    const addMarker = () =>{
      const popupOffSet = {
        bottom: [0,-35]
      }
      const popup = new tt.Popup({offset:popupOffSet}).setHTML('This is you!')

      const element = document.createElement('div');
      element.className = classes.marker;
      

      const marker = new tt.Marker()
      .setLngLat([longitude,latitude])
      .addTo(map)

    marker.setPopup(popup).togglePopup()
    }
  
    addMarker()
    


    return () => {
    map.remove()
    setLatitude('')
    setLongitude('')
    }
  },[longitude,latitude])


  return (
   <>
   {map && ( 
     <>
    <div style={{width:'100%',height:'300px'}} ref={mapElement}/> 
  
    
      </>  
      ) 
   }
   
   </>
)
  }

export default Map