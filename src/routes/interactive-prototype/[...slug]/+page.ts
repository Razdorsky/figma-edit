import {error} from '@sveltejs/kit';
import {pages,type Edition} from '#lib/interactive/site.ts';
// English only, and one page: the story (docs/interactive-prototype.md).
export const entries=()=>pages.map(page=>({slug:page.slug}));
export function load({params}:{params:{slug?:string}}){const page=pages.find(p=>p.slug===(params.slug||'').replace(/^\/|\/$/g,''));if(!page)error(404,'Page not found');return {edition:'interactive-prototype' as Edition,page};}
