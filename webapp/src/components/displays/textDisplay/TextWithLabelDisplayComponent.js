import '../../Components.css';

export const TextDisplay = props => {
  const labelName = `${String(props?.name)[0].toUpperCase()}${String(props?.name).slice(1)}: `;

  return (
    <div className="text_display">
      <label>{labelName}</label>
      <div>{props.value}</div>
    </div>
  )
}
