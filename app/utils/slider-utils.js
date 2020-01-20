import isMobile from 'ismobilejs'

export function getJustify(justify) {
  return isMobile().phone ? 'center' : justify
}
