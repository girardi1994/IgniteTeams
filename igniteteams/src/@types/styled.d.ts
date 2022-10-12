import 'style-components';
import theme from '@theme/index';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaulTheme extends Themetype{}
}