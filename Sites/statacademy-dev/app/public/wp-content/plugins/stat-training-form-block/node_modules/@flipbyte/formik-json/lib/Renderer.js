'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formik = require('formik');

var _withFormConfig = require('./withFormConfig');

var _withFormConfig2 = _interopRequireDefault(_withFormConfig);

var _registry = require('./registry');

var _whenCondition = require('@flipbyte/when-condition');

var _whenCondition2 = _interopRequireDefault(_whenCondition);

var _ErrorManager = require('./ErrorManager');

var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Render the element based on it's type and renderer
 * and pass all the props received to the newly created element.
 *
 * @param  {object} props
 * @return {Component}
 */
var renderElement = function renderElement(_ref) {
    var config = _ref.config,
        formik = _ref.formik,
        value = _ref.value,
        error = _ref.error;

    var type = config.type,
        renderer = config.renderer,
        wrapAs = config.wrapAs,
        rest = _objectWithoutProperties(config, ['type', 'renderer', 'wrapAs']);

    var registry = type === _registry.FIELD ? _registry.fields : _registry.containers;
    var Renderer = typeof renderer === 'string' ? registry.get(renderer) : renderer;

    return _react2.default.createElement(Renderer, { config: _extends({ type: type }, rest), formik: formik, value: value, error: error });
};

/**
 * Generic element renderer component that renders based on the type and renderer of the element
 * It decides which renderer to use for fields, containers and templates and renders them accordingly
 *
 * @param {object} config
 * @param {string} error
 * @param {object} validationSchema
 * @param {object} formik
 * @param {object} rest
 */
var ElementRenderer = function ElementRenderer(_ref2) {
    var config = _ref2.config,
        validationSchema = _ref2.validationSchema,
        formik = _ref2.formik,
        rest = _objectWithoutProperties(_ref2, ['config', 'validationSchema', 'formik']);

    var type = config.type,
        name = config.name,
        showWhen = config.showWhen,
        enabledWhen = config.enabledWhen,
        template = config.template;

    var _useFormikContext = (0, _formik.useFormikContext)(),
        values = _useFormikContext.values;

    var _useState = (0, _react.useState)(showWhen ? false : true),
        canShow = _useState[0],
        setCanShow = _useState[1];

    var _useState2 = (0, _react.useState)(enabledWhen ? true : false),
        disabled = _useState2[0],
        setDisabled = _useState2[1];

    /**
     * If the template is function, assuming it is a react component, use it
     * Otherwise, consider it a string and try to fetch it, or the default component from the template registry
     */


    var Template = typeof template === 'function' ? template : _registry.templates.get(template || 'default');

    /**
     * When the values have changed process conditions on fields,
     * to decide whether to show and/or enable them or not.
     */
    (0, _react.useEffect)(function () {
        Promise.all([showWhen ? (0, _whenCondition2.default)(showWhen, values) : true, enabledWhen ? (0, _whenCondition2.default)(enabledWhen, values) : true]).then(function (_ref3) {
            var canShow = _ref3[0],
                enabled = _ref3[1];

            setCanShow(canShow);
            setDisabled(!enabled);
        });
    }, [values]);

    return !!type && canShow && (type === _registry.FIELD ? _react2.default.createElement(
        _formik.Field,
        { name: name },
        function (_ref4) {
            var value = _ref4.field.value;
            return _react2.default.createElement(
                _ErrorManager2.default,
                { name: name },
                function (error) {
                    return _react2.default.createElement(
                        Template,
                        _extends({ disabled: disabled, error: error }, config),
                        renderElement({ config: config, formik: formik, value: value, error: error })
                    );
                }
            );
        }
    ) : renderElement({ config: config, formik: formik }));
};

exports.default = (0, _withFormConfig2.default)(ElementRenderer);
module.exports = exports['default'];