import {globalStyle} from '@vanilla-extract/css'

globalStyle('*, :after,:before ', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle(':root', {
  colorScheme: 'light dark',
  fontFamily: 'system-ui',
  fontSize: '100%',
  fontWeight: 400,
  fontSynthesis: 'none',
  fontVariantNumeric: 'tabular-nums lining-nums',
  textRendering: 'optimizeLegibility',

  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
})
