import { useState, useEffect } from 'react';
import '../../Components.css';

export const GridDisplay = (props) => {
  const L = 5;
  const R = 6;

  const [ displayTextArray, setDisplayTextArray ] = useState(Array(L * R));

  const updateDisplayText = useEffect((newValue) => {
    setDisplayTextArray( oldArray => { 
      return [ ...oldArray, newValue ] 
    });
  }, []);

  const removeDisplayText = useEffect(() => {
    setDisplayTextArray( oldArray => { oldArray.pop(); return oldArray });  
  }, []);

  /**
   * I have a display grid with L * R letters => an array L * R long
   * 
   * When a keyEvent happens, then I want to push that keyValue to the first position that is null
   * 
   * And render the array values into each child in order
   * 
   * If a backspace keyEvent is fired then delete the last non null value from the Array
   */

  // const onKeyDownHandler = (e) => {
  //   e.preventDefault();
  //   if(e.key === 'Backspace') {
  //     removeDisplayText();
  //   } else if (e.key === 'Enter') {
  //     // TODO
  //   } else if (e.key) {
  //     const keyValue = e.target.value;
  //     updateDisplayText(keyValue);
  //   }
  //   console.log(`DTA`, displayTextArray);
  // }

  const onKeyDownHandler = (e) => console.log(e.key);

  return (
    <div className="grid_display" onKeyDown={onKeyDownHandler}>{props.children}</div>
  )
}
