// Figma Edit (owner, 2026-11-11): a copy of the frozen Figma edition brought in line with the agency's content brief
// (The Vessyl - website content, 3 October 2026) without changing its design or the order of its blocks. docs/figma-edit.md.
import sourcePages from './site-data.json';
import media from './media.json';
export type Edition = 'figma-edit';
export type PageMeta = {index:number;id:string;name:string;slug:string;photo:boolean};
export const pages:PageMeta[]=sourcePages;
import type {Locale} from './i18n.ts';
// Orbe's booking page in the reader's language: /en/ or /es/ (owner, 2026-11-09).
export const bookingFor=(locale:Locale='en')=>`https://reservations.orbebooking.com/Search/Init/PAS6c/${locale}/`;
export const booking=bookingFor('en');
// Spanish pages live under /figma-edit/es/ (docs/figma-spanish.md).
export const route=(edition:Edition,slug='',base='',locale:Locale='en')=>`${base.replace(/\/$/,'')}/${edition}/${locale==='es'?'es/':''}${slug?slug+'/':''}`;
/** A route parameter such as "es/villas" split into its language and page slug. */
export function parseSlug(param=''):{locale:Locale;slug:string}{const clean=param.replace(/^\/|\/$/g,'');return clean==='es'||clean.startsWith('es/')?{locale:'es',slug:clean.slice(3)}:{locale:'en',slug:clean};}
export function photo(index:number){const aliases=(media.find(p=>p.index===index)?.aliases||{}) as Record<string,string>;return Object.entries(aliases).find(([key,url])=>!/Logo|Wordmark|Symbol|Pattern|Color|Group|Vector/i.test(key)&&!url.endsWith('.svg'))?.[1]||Object.values(aliases).find(u=>!u.endsWith('.svg'))||'';}
export const canvas=(edition:string,index:number)=>edition==='blueprint'?(index===1?'#311500':'#141913'):'#ffffff';

export const base=__SITE_BASE__;
