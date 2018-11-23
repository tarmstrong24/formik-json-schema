import _ from 'lodash';
import React from 'react';
import Label from './Label';
import Select from 'react-select';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const prepareOptions = ( options ) =>
    _.reduce(options, (result, value) => {
        if(!_.isObject(value) && !_.isEmpty(value)) {
            result.push({ value: value, label: value })
        } else {
            result.push(value);
        }

        return result;
    }, [])

const ReactSelect = ({ config, formikProps, submitCountToValidate, containerName }) => {
    const {
        name: elementName,
        label,
        options: initialOptions,
        defaultValue,
        multi,
        noOptionsMessage,
        prefixContainerName = false,
        labelClass = '',
        inputClass = '',
        formGroupClass = 'form-group'
    } = config;
    const { values, setFieldValue } = formikProps;
    const name = prefixContainerName && containerName ? joinNames(containerName, elementName) : elementName;
    const error = hasError(name, submitCountToValidate, formikProps);
    const options = prepareOptions(initialOptions);
    const selectedValue = _.get(values, name, defaultValue);
    const selectedOption = options.filter(option => option.value == selectedValue);

    const conditionalProps = {};
    if(noOptionsMessage) {
        conditionalProps[noOptionsMessage] = noOptionsMessage;
    }

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <Select
                id={ name }
                name={ name }
                options={ options }
                className={ inputClass + ( error ? ' is-invalid ' : '') }
                multi={ multi }
                onChange={
                    (value) => changeHandler(setFieldValueWrapper(setFieldValue, name), formikProps, config, value.value)
                }
                value={ selectedOption }
                noOptionsMessage={ noOptionsMessage }
                { ...conditionalProps }
            />
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default ReactSelect;
