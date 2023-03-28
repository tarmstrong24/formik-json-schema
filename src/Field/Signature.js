import React, {useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { changeHandler, setFieldValueWrapper } from '../utils';

const Signature = ({ config, formik, value = '', error }) => {
    const {
        name,
        velocityFilterWeight = 0.7,
        minWidth = 0.5,
        maxWidth = 2.5,
        minDistance = 5,
        dotSize = () => (this.minWidth + this.maxWidth) / 2,
        penColor = 'black',
        throttle = 16,
        attributes,
        fieldClass
    } = config;

    const { setFieldValue, handleBlur } = formik;
    const signImg = "data:image/png;base64,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";
    const sigRef = useRef(null);
    const [signed, setSigned] = useState(false);
    useEffect(() => {
        if (!signed){
            sigRef.current.clear();
            sigRef.current.fromDataURL(signImg);
        }
      }, []);

    const startHandler = ()=>{
          
    }  
    const endHandler = ( selectedOptions ) => {
        const signature = sigRef.current.getTrimmedCanvas().toDataURL('image/png');
        return changeHandler(
            setFieldValueWrapper(setFieldValue, name),
            formik,
            config,
            signature
        );
    }
    return (
        <SignatureCanvas
            id={ name }
            name={ name }
            className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
            value={ value }
            velocityFilterWeight = {velocityFilterWeight}
            minWidth = {minWidth}
            maxWidth = {maxWidth}
            minDistance = {minDistance}
            dotSize = {dotSize}
            penColor = {penColor}
            throttle = {throttle}
            ref = {sigRef}
            onBegin = {startHandler}
            onEnd = {endHandler}
            canvasProps = {{border: '1px solid', className: 'sigCanvas'}}
            { ...attributes }
        />
    );
}

export default React.memo(Signature);
