import '../../Components.css';

export const TextInput = props => {
  const labelName = `${String(props?.name)[0].toUpperCase()}${String(props?.name).slice(1)}: `;

  return (
    <div className= "number_input">
      <label>{labelName}</label>
      <input 
        type="text"
        maxLength={props.length ?? 1}
        placeholder='Enter number here...'
        value={props.value}
        onChange={props.onChange}
      ></input>
    </div>
  )
}
