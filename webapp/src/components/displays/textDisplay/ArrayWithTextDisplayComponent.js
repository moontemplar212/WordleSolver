import '../../Components.css';
import { useArray } from '../../hooks';

export const ArrayTextDisplay = props => {
  const textList = useArray(props.children);

  const childComponents = textList.map((text, idx) => <div key={idx}>{text}</div>);

  return (
    <div className="text_display">{childComponents}</div>
  )
}
