import React from 'react';
import { changeHandler } from '../utils';
import InputMask from "react-input-mask";

const Text = ({ config, formik, value = '', error }) => {
    const {
        name,
        type,
        attributes,
        fieldType,
        defaultValue,
        mask,
        icon,
        fieldClass = 'form-control',
        inputGroupClass = 'input-group'
        
    } = config;

    const { handleChange, handleBlur } = formik;
    const isInputGroup = icon ? true : false;

    return (
        isInputGroup ?
            <div className={ inputGroupClass }>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className={ icon }></i>
                    </span>
                </div>
                <InputMask
                    id={ name }
                    mask={ mask } 
                    name={ name }
                    type={ fieldType }
                    className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                    value={ value }
                    onChange={ changeHandler.bind(this, handleChange, formik, config) }
                    onBlur={ handleBlur }
                    { ...attributes }
                />
            </div> :
            <InputMask
                id={ name }
                mask={ mask } 
                name={ name }
                type={ fieldType }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                value={ value }
                onChange={ changeHandler.bind(this, handleChange, formik, config) }
                onBlur={ handleBlur }
                { ...attributes }
            />
    );
}

export default React.memo(Text);
