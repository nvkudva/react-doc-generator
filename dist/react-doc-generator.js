#!/usr/bin/env node
'use strict';

var _reactDocgen = require('react-docgen');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _command = require('./lib/command.js');

var _command2 = _interopRequireDefault(_command);

var _nodeDir = require('node-dir');

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require('../package.json');
var table = new _cliTable2.default({
    head: [_colors2.default.cyan('Path'), _colors2.default.cyan('Components'), _colors2.default.cyan('Status')]
});

_handlebars2.default.registerHelper('inc', function (value, options) {
    return parseInt(value, 10) + 1;
});

console.log(_colors2.default.white('\n\nREACT DOC GENERATOR v' + pkg.version));
console.log(_colors2.default.white('by Marcin Borkowski <marborkowski@gmail.com>'));

var output = _fs2.default.createWriteStream(_command2.default.output);
var templateData = {
    files: [],
    version: pkg.version,
    documentTitle: _command2.default.title
};

var template = _handlebars2.default.compile('' + _fs2.default.readFileSync(_path2.default.join(__dirname, 'template.handlebars')));

if (_command2.default.args.length !== 1) {
    console.log('' + _colors2.default.red('Please specify <dir> as the first argument!'));
    _command2.default.help();
} else {
    (0, _nodeDir.readFiles)(_command2.default.args[0], {
        match: new RegExp('\\.(?:' + _command2.default.extensions.join('|') + ')$'),
        exclude: _command2.default.excludePatterns,
        excludeDir: _command2.default.ignore
    }, function (err, content, filename, next) {
        if (err) {
            console.error("Error even before processing ", filename);
            console.error(err);
        }

        try {
            var components = (0, _reactDocgen.parse)(content, _reactDocgen.resolver.findAllExportedComponentDefinitions);
            components = components.map(function (component) {
                if (component.description && !component.displayName) {
                    component.title = component.description.match(/^(.*)$/m)[0];
                    if (component.description.split('\n').length > 1) {
                        component.description = component.description.replace(/[\w\W]+?\n+?/, '');
                        component.description = component.description.replace(/(\n)/gm, '   \n');
                    } else {
                        component.description = null;
                    }
                } else {
                    component.title = component.displayName;
                }

                if (component.description) {
                    component.description = component.description + '   \n\n';
                }

                // validate default values
                if (component.props) {
                    var propswithIssues = [];
                    Object.keys(component.props).forEach(function (key) {
                        var obj = component.props[key];
                        if (obj.defaultValue) {
                            try {
                                var isString = obj.type.name === 'string' && typeof obj.defaultValue.value === 'string';
                            } catch (e) {
                                console.error("Error in:", filename, "Component:", component.displayName, "Prop:", key, " has issue. Please carefully check if propType and defaultvalue are defined and matching and valid");
                                propswithIssues.push(key);
                            }
                            var isInvalidValue = /[^\w\s.&:\-+*,!@%$]+/igm.test(obj.defaultValue.value);
                            if (isInvalidValue && !isString) {
                                obj.defaultValue.value = 'ERROR: Invalid Value';
                            }
                        }
                        if (obj.description) {
                            var processedDescription = obj.description.split('\n').map(function (text) {
                                return text.replace(/(^\s+|\s+$)/, '');
                            }).map(function (hasValidValue) {
                                return hasValidValue;
                            }).join(' ');
                            obj.description = processedDescription;
                        }
                    });
                    if (propswithIssues.length > 0) throw new Error(component.displayName + " Component has issues in props: " + propswithIssues);
                }
                return component;
            });
            templateData.files.push({ filename: filename, components: components });
            table.push([filename, components.length, _colors2.default.green('OK.')]);
        } catch (e) {
            table.push([filename, 0, _colors2.default.red(e.message + '\nYou have to export at least one valid React Class!')]);
        }

        next();
    }, function (err) {
        if (err) {
            console.error("Unknown ERROR:", err);
        }

        if (templateData.files.length === 0) {
            var extensions = _command2.default.extensions.map(function (ext) {
                return '`*.' + ext + '`';
            });
            console.log(_colors2.default.bold.yellow('Warning:') + ' ' + _colors2.default.yellow('Could not find any files matching the file type: ' + extensions.join(' OR ')) + '\n');
        } else {
            console.log(table.toString() + '\n\n');
        }

        output.write(template(templateData));
    });
}