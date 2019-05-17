const yaml = require('js-yaml');
const ini = require('ini');
const fs = require('fs');
const { resolve } = require('path');

export const parseJson = (...paths) => paths.map(p => JSON.parse(fs.readFileSync(resolve(p), 'utf8')));

export const parseYaml = (...paths) => paths.map(p => yaml.safeLoad(fs.readFileSync(resolve(p), 'utf8')));

export const parseIni = (...paths) => paths.map(p => ini.parse(fs.readFileSync(resolve(p), 'utf8')));
