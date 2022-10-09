import '../../Components.css';
import { useText } from '../../hooks/textHook';

export const TextInput = (props) => {
  const [ text , setText ] = useText(props.children);
  const labelName = `${String(props?.name)[0].toUpperCase()}${String(props?.name).slice(1)}: `;
  const length = parseInt(props?.length) ?? 1;

  const onChangeHandler = (e) => {
    e.preventDefault();
    return setText(e.target.value.replace(/[^0-9]/g, ''));
  }

  return (
    <div className= "number_input">
      <label>{labelName}</label>
      <input 
        type="text"
        maxLength={length}
        placeholder='Enter number here...'
        onChange={onChangeHandler}
        value={text}
      ></input>
    </div>
  )
}
