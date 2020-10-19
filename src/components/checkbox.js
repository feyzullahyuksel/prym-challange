import React from 'react';
import style from '../App.module.scss';

function CheckboxField(props) {
  return (
    <div className={style.formFieldCheckbox}>
      <input
        type='checkbox'
        id={props.id}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default CheckboxField;
