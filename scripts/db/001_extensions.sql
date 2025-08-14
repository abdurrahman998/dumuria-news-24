-- Run first: required extensions
create extension if not exists pg_trgm;
create extension if not exists pgcrypto; -- for gen_random_uuid()
