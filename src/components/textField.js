import React from 'react';
import style from '../App.module.scss';

function TextField(props) {
  return (
    <div className={style.formFieldText}>
      <label htmlFor={props.id}>
        {props.label}
        {props.required ? ' *' : ''}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required || false}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default TextField;
