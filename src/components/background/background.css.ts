import {style} from '@vanilla-extract/css'

export const Background = style({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -50,
  height: '100vh',
  width: '100vw',
  objectFit: 'cover',
  filter: 'brightness(50%);',
})
