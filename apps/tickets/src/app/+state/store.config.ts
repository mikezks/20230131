import { isDevMode } from '@angular/core';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';

const isProd = !isDevMode();

export const STATES_MODULES = [];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  developmentMode: !isProd,
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  disabled: isProd,
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: isProd,
};
