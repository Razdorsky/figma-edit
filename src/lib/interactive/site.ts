// Interactive Prototype edition (owner, 2026-11-10): the one-scene concept of the site, brought into the repository
// as it was received and developed here step by step. See docs/interactive-prototype.md.
import sourcePages from './site-data.json';
export type Edition = 'interactive-prototype';
export type PageMeta = {index:number;id:string;name:string;slug:string;photo:boolean};
// One page: the story. Its inner pages are layers over it, not addresses of their own.
export const pages:PageMeta[]=sourcePages;
export const route=(edition:Edition,slug='',base='')=>`${base.replace(/\/$/,'')}/${edition}/${slug?slug+'/':''}`;
// The prototype's ink (--ink in styles/base.css).
export const canvas=(_edition:string='interactive-prototype',_index=0)=>'#111111';

export const base=__SITE_BASE__;
/** The address of a photograph kept in public/interactive/img: a file name, or a bare name for one of the prototype's own .jpg files. */
export const photo=(name:string)=>`${base}/interactive/img/${/\.\w+$/.test(name)?name:name+'.jpg'}`;
