'use strict';

exports.__esModule = true;
exports.prepareValidationSchema = exports.changeHandler = exports.getName = exports.joinNames = exports.setFieldValueWrapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _whenCondition = require('@flipbyte/when-condition');

var _whenCondition2 = _interopRequireDefault(_whenCondition);

var _registry = require('./registry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setFieldValueWrapper = exports.setFieldValueWrapper = function setFieldValueWrapper(setFieldValue, name) {
    return function (value) {
        return setFieldValue(name, value);
    };
};
var joinNames = exports.joinNames = function joinNames() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return _lodash2.default.join(_lodash2.default.filter(args, function (arg) {
        return _lodash2.default.isString(arg) && arg || _lodash2.default.isInteger(arg);
    }), '.');
};
var getName = exports.getName = function getName(type, name) {
    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
    }

    return type === _registry.FIELD && !name ? null : joinNames.apply(undefined, args.concat([name]));
};

/**
 * Handle Change and trigger callback if provided
 *
 * @param  {function} handler
 * @param  {object} formikProps
 * @param  {object} config
 * @param  {object} data
 * @param  {string} key
 * @return {void}
 */
var changeHandler = exports.changeHandler = function changeHandler(handler, formikProps, config, data) {
    var key = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'onChange';

    handler(data);
    _lodash2.default.isFunction(config[key]) && config[key](formikProps, config, data);
};

/**
 * Recurively prepare a complete validation schema array for yup-schema from individual
 * validation arrays passed to fields
 *
 * @param  {array} schema
 * @return {array}
 */
var prepareValidationSchema = exports.prepareValidationSchema = function prepareValidationSchema(schema) {
    var type = schema.type,
        elements = schema.elements,
        name = schema.name,
        renderer = schema.renderer,
        validation = schema.validation,
        _schema$prefixNameToE = schema.prefixNameToElement,
        prefixNameToElement = _schema$prefixNameToE === undefined ? false : _schema$prefixNameToE;

    if (type === _registry.FIELD && validation) {
        var _ref;

        return _ref = {}, _ref[name] = validation, _ref;
    }

    var elementSchema = _lodash2.default.reduce(elements, function () {
        var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var element = arguments[1];
        var key = arguments[2];

        return _extends({}, result, prepareValidationSchema(element));
    }, {});

    var result = {};
    if (renderer === 'editable-grid' && !_lodash2.default.isEmpty(elementSchema)) {
        result[name] = [['array', [['object', elementSchema]]]];
    } else if (!_lodash2.default.isEmpty(elementSchema) && name) {
        result[name] = [['object', elementSchema]];
    } else {
        result = _extends({}, result, elementSchema);
    }

    return result;
};