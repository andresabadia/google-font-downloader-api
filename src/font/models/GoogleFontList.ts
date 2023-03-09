import { GoogleFontItem } from './GoogleFontItem';

export interface GoogleFontList {
  kind: 'webfonts#webfontList';
  items: GoogleFontItem[];
}
