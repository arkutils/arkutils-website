import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const prerender = false;

export const load: PageLoad = async ({ params }) => {
    const err = parseInt(params.err);
    error(err || 500, 'test error');
}
