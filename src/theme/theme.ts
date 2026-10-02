import type { GlobalThemeOverrides } from 'naive-ui'

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#ea580c',
    primaryColorHover: '#f97316',
    primaryColorPressed: '#c2410c',
  },

  Menu: {
    itemTextColor: '#57534e',
    itemTextColorHover: '#c2410c',
    itemTextColorActive: '#c2410c',
    itemTextColorActiveHover: '#c2410c',

    itemColorHover: '#fff7ed',
    itemColorActive: '#ffedd5',
    itemColorActiveHover: '#ffedd5',
  },
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#ea580c',
    primaryColorHover: '#f97316',
    primaryColorPressed: '#c2410c',
  },

  Menu: {
    itemTextColor: '#e7e5e4',
    itemTextColorHover: '#fb923c',
    itemTextColorActive: '#fb923c',
    itemTextColorActiveHover: '#fdba74',

    itemColorHover: '#292524',
    itemColorActive: '#431407',
    itemColorActiveHover: '#431407',
  },
}