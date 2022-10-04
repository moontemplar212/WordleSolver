import '../../Components.css';
import { useText } from './textDisplayHook';

export const TextDisplay = (props) => {
  const [ text ] = useText(props.children);
  const labelName = `${String(props?.name)[0].toUpperCase()}${String(props?.name).slice(1)}: `;

  return (
    <div className="textDisplay">
      <label>{labelName}</label>
      <div>{text}</div>
    </div>
  )
}
