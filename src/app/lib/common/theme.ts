import { writable } from 'svelte/store'
import { ApplicationSettings } from 'tns-core-modules';

export enum Theme {
  ROSE_PINE_DARK,
  ROSE_PINE_LIGHT,
}

export namespace Theme {
  export function getName(theme: Theme): string {
    switch (theme) {
      case Theme.ROSE_PINE_DARK: return 'Rosé Pine Moon';
      case Theme.ROSE_PINE_LIGHT: return 'Rosé Pine Dawn';
    }
  }

  export function getColors(theme: Theme): ThemeColors {
    return themes.find(t => t.type == theme) || defaultThemeColors;
  }
}

export interface ThemeColors {
  type: Theme,

  baseDark: string,
  baseMid: string,
  baseLight: string,
  muted: string,
  subtle: string,
  text: string,
  love: string,
  gold: string,
  rose: string,
  pine: string,
  foam: string,
  iris: string,
  highlightDark: string,
  highlightMid: string,
  highlightLight: string,
}

const themeSettingsKey = 'themeEnum';

let themes = [
  {
    type: Theme.ROSE_PINE_DARK,

    baseDark: '#191724',
    baseMid: '#1f1d2e',
    baseLight: '#26233a',
    muted: '#6e6a86',
    subtle: '#908caa',
    text: '#e0def4',
    love: '#eb6f92',
    gold: '#f6c177',
    rose: '#ebbcba',
    pine: '#31748f',
    foam: '#9ccfd8',
    iris: '#c4a7e7',
    highlightDark: '#21202e',
    highlightMid: '#403d52',
    highlightLight: '#524f67',
  },
  {
    type: Theme.ROSE_PINE_LIGHT,

    baseDark: '#faf4ed',
    baseMid: '#fffaf3',
    baseLight: '#f2e9e1',
    muted: '#9893a5',
    subtle: '#797593',
    text: '#575279',
    love: '#b4637a',
    gold: '#ea9d34',
    rose: '#d7827e',
    pine: '#286983',
    foam: '#56949f',
    iris: '#907aa9',
    highlightDark: '#f4ede8',
    highlightMid: '#dfdad9',
    highlightLight: '#cecacd',
  }
];

export let defaultThemeColors = getThemeFromSettings();
export let themeStore = writable<ThemeColors>(defaultThemeColors);

export function updateTheme(theme: Theme): void {
  let colors = Theme.getColors(theme);

  themeStore.set(colors);

  ApplicationSettings.setNumber('themeEnum', colors.type);
}

function getThemeFromSettings(): ThemeColors {
  return Theme.getColors(ApplicationSettings.getNumber(themeSettingsKey, 0));
}
