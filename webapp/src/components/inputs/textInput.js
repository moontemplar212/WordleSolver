import { useId, useState } from "react";

export default TextInput = (labelName, props) => {
  const id = useId();
  const [input, setInput] = useState(props?.value ?? '');
  return (
    <div>
      <label htmlFor={id}>{labelName}</label>
      <input id={id} value={input} onInput={e => setInput(e.target.value)}/>
    </div>
  );
}
