import {error, redirect} from '@sveltejs/kit';
import {base,formerSlugs,pages,parseSlug,route,type Edition} from '#lib/pr/site.ts';
// Every page in English and, under es/, in Spanish (docs/figma-spanish.md).
export const entries=()=>[...pages.flatMap(page=>[{slug:page.slug},{slug:page.slug?`es/${page.slug}`:'es'}]),...Object.keys(formerSlugs).flatMap(slug=>[{slug},{slug:`es/${slug}`}])];
// A former address sends the reader to the page's address from the content brief (docs/figma-edit.md).
export function load({params}:{params:{slug?:string}}){const {locale,slug}=parseSlug(params.slug||'');if(slug in formerSlugs)redirect(301,route('figma-pr',formerSlugs[slug],base,locale));const page=pages.find(p=>p.slug===slug);if(!page)error(404,'Page not found');return {edition:'figma-pr' as Edition,page,locale};}
