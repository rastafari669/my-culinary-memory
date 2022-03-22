import { makeStyles } from '@material-ui/core/styles';
import Image from '../../images/marker.png';

export default makeStyles({
  marker :{
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    width:'42px',
    height: '42px',
    borderRadius: '11px',
    border: 'solid 3px grey'


  },
  title:{
      fontWeight: 'bold',
      width: '30px',
      height: '30px'
  }
 
});