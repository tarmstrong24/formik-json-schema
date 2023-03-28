'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formik = require('formik');

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _withFormConfig = require('./withFormConfig');

var _utils = require('./utils');

var _yupSchema = require('@flipbyte/yup-schema');

var _yupSchema2 = _interopRequireDefault(_yupSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormikForm = function FormikForm(_ref) {
    var onUpdate = _ref.onUpdate,
        schema = _ref.schema,
        formik = _objectWithoutProperties(_ref, ['onUpdate', 'schema']);

    /**
     * Callback if provided will be vcalled when form values change
     */
    (0, _react.useEffect)(function () {
        if (typeof onUpdate === 'function') {
            onUpdate(formik);
        }
    }, [formik.values]);

    return _react2.default.createElement(_Element2.default, { config: schema });
};

var Form = _react2.default.forwardRef(function (_ref2, ref) {
    var schema = _ref2.schema,
        _ref2$onUpdate = _ref2.onUpdate,
        onUpdate = _ref2$onUpdate === undefined ? function () {} : _ref2$onUpdate,
        _ref2$initialValues = _ref2.initialValues,
        initialValues = _ref2$initialValues === undefined ? {} : _ref2$initialValues,
        rest = _objectWithoutProperties(_ref2, ['schema', 'onUpdate', 'initialValues']);

    var _useState = (0, _react.useState)(null),
        validationSchema = _useState[0],
        setValidationSchema = _useState[1];

    /**
     * Initialize validation schema.
     *
     * Convert the validation schema rules from yup-schema array to yup object
     */


    var initValidationSchema = (0, _react.useCallback)(function () {
        var yupSchema = (0, _utils.prepareValidationSchema)(schema);
        var validationSchema = !_lodash2.default.isEmpty(yupSchema) ? new _yupSchema2.default([['object', yupSchema]]).toYup() : null;
        setValidationSchema(validationSchema);
    }, [schema]);

    /**
     * Everytime the schema changes, re-initialize validationSchema
     *
     * This is has to be done everytime schema changes because,
     * certain cases may involve dynamically changing form fields based on
     * certain conditions, routes etc.
     */
    (0, _react.useEffect)(function () {
        initValidationSchema();
    }, [schema]);

    var formProps = _extends({}, rest, { initialValues: initialValues });
    if (null !== validationSchema) {
        formProps.validationSchema = validationSchema;
    }

    return _react2.default.createElement(
        _withFormConfig.SchemaProvider,
        { value: { validationSchema: validationSchema, schema: schema } },
        _react2.default.createElement(
            _formik.Formik,
            _extends({}, formProps, {
                innerRef: ref
            }),
            function (props) {
                return _react2.default.createElement(FormikForm, _extends({
                    onUpdate: onUpdate,
                    schema: schema
                }, props));
            }
        )
    );
});

exports.default = Form;
module.exports = exports['default'];