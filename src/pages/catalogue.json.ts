// The live catalogue, used by the admin sheet's "Set up" to fill its tabs.
import type { APIRoute } from 'astro';
import catalogue from '../data/catalogue.json';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(catalogue), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
