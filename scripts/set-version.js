#!/usr/bin/env node
'use strict';

// Sets the app version to  YEAR.MMDD.N  (e.g. 2026.1110.0) and adds a changelog entry.
//   node scripts/set-version.js "What changed" ["Wat er veranderd is"]
//   node scripts/set-version.js changelog-file.json   ({ "en": "...", "nl": "...", "de": "...", ... } for all languages)
//
//   YEAR  year of the release
//   MMDD  month and day as ONE number, without leading zero (5 January = 105, 10 November = 1110)
//   N     release counter for that day, starts at 0
//
// Homey needs a valid semver (three numbers); this fits and always goes up over time.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const [, , en, nl] = process.argv;

if (!en) {
  console.error('Usage: node scripts/set-version.js "Changelog text (English)" ["Changelog tekst (Nederlands)"]');
  console.error('   or: node scripts/set-version.js changelog-file.json   (an object with a text per language)');
  process.exit(1);
}

// The changelog is either given as text (en, nl) or as a JSON file with a text per language.
let entry;
if (en.endsWith('.json')) {
  entry = JSON.parse(fs.readFileSync(path.resolve(en), 'utf8'));
  if (!entry || typeof entry.en !== 'string') {
    console.error('The JSON file must be an object with at least an "en" text.');
    process.exit(1);
  }
} else {
  entry = nl ? { en, nl } : { en };
}

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const writeJson = (file, data) => fs.writeFileSync(path.join(root, file), `${JSON.stringify(data, null, 2)}\n`);

const now = new Date();
const year = now.getFullYear();
const mmdd = (now.getMonth() + 1) * 100 + now.getDate();

const compose = readJson('.homeycompose/app.json');
const [curYear, curMmdd, curN] = String(compose.version).split('.').map(Number);

let counter = 0;
if (curYear === year && curMmdd === mmdd) counter = curN + 1;
if (curYear > year || (curYear === year && curMmdd > mmdd)) {
  console.error(`Current version ${compose.version} is newer than today's date. Fix your clock or the version by hand.`);
  process.exit(1);
}

const version = `${year}.${mmdd}.${counter}`;

compose.version = version;
writeJson('.homeycompose/app.json', compose);

for (const file of ['app.json', 'package.json']) {
  if (fs.existsSync(path.join(root, file))) {
    const data = readJson(file);
    data.version = version;
    writeJson(file, data);
  }
}

const changelogFile = '.homeychangelog.json';
const changelog = fs.existsSync(path.join(root, changelogFile)) ? readJson(changelogFile) : {};
changelog[version] = entry;
writeJson(changelogFile, changelog);

console.log(`Version set to ${version}`);
console.log('Next: homey app validate --level publish   then   homey app publish');
