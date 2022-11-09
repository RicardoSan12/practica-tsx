import * as React from 'react';
import { useState } from 'react';
import { subscriptor } from '../types';

interface Props {
  onNewSub: React.Dispatch<React.SetStateAction<subscriptor[]>>;
}
interface FormState {
  sub: subscriptor;
}

const Form = ({ onNewSub }: Props) => {
  const [inputValues, setInputValues] = useState<FormState['sub']>({
    avatar: '',
    name: '',
    month: 0,
    description: '',
  });

  const handleSummit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNewSub((sub) => [...sub, inputValues]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="Form">
      <form onSubmit={handleSummit}>
        <input
          type="text"
          onChange={handleChange}
          value={inputValues.avatar}
          placeholder="Url de img"
          name="avatar"
        />
        <input
          type="text"
          onChange={handleChange}
          value={inputValues.name}
          placeholder="Nombre"
          name="name"
        />
        <input
          type="text"
          onChange={handleChange}
          value={inputValues.month}
          placeholder="Meses"
          name="month"
        />
        <input
          type="text"
          onChange={handleChange}
          value={inputValues.description}
          placeholder="description"
          name="description"
        />
      </form>
    </div>
  );
};
export default Form;
