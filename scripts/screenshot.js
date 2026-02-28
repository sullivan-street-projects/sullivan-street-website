#!/usr/bin/env node
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    output:    { type: 'string',  short: 'o', default: './screenshot.png' },
    width:     { type: 'string',  short: 'w', default: '1280' },
    height:    { type: 'string',  short: 'h', default: '720' },
    scale:     { type: 'string',  short: 's', default: '2' },
    'full-page': { type: 'boolean', default: false },
    selector:  { type: 'string',  default: '' },
    delay:     { type: 'string',  default: '0' },
    help:      { type: 'boolean', default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`
Usage: node scripts/screenshot.js <url> [options]

Options:
  -o, --output <path>     Output file path (default: ./screenshot.png)
  -w, --width <px>        Viewport width (default: 1280)
  -h, --height <px>       Viewport height (default: 720)
  -s, --scale <n>         Device pixel ratio (default: 2)
      --full-page         Capture full scrollable page
      --selector <css>    Screenshot a specific element
      --delay <ms>        Wait after load (default: 0)
      --help              Show this help
`.trim());
  process.exit(0);
}

const url = positionals[0];
const config = {
  output:   values.output,
  width:    parseInt(values.width, 10),
  height:   parseInt(values.height, 10),
  scale:    parseFloat(values.scale),
  fullPage: values['full-page'],
  selector: values.selector,
  delay:    parseInt(values.delay, 10),
};

// Will add screenshot logic in Task 3, dev server logic in Task 4
console.log('Config:', config);
console.log('URL:', url);
