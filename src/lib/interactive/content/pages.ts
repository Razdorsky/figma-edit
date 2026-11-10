// The inner pages of the Interactive Prototype edition, by the key their links carry in data-p.
// Each is a digest in the prototype's own template: a photograph, a title, one paragraph, three or four facts and
// one button. docs/interactive-prototype.md, "Inner pages", says where every part comes from;
// scripts/interactive-strings.mjs checks it.
import data from './pages.json';

export type InnerPage = {
  /** The page of the frozen Figma edition the digest is taken from, or 'prototype' for a page its author wrote. */
  from: number | 'prototype';
  /** For the author's pages: the Figma page their button is taken from. */
  figma?: number;
  title: string;
  /** A file in public/interactive/img. */
  photo: string;
  /** Which height of the photograph the band keeps, in percent from its top. Without it, the middle. */
  focus?: number;
  /** Whole strings, joined into the one paragraph. */
  lede: string[];
  /** Label and value. */
  facts: [string, string][];
  /** The button: a tab of the booking panel, or another inner page. */
  cta: {label: string; book?: 'stay' | 'exp' | 'table' | 'ask'; page?: string};
};

export const innerPages = data as unknown as Record<string, InnerPage>;
