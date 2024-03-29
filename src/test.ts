// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
context.keys().map(context);
