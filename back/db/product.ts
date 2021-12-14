/* eslint-disable max-len */
import * as pg from 'pg';
import { schema_def } from '.';

export const schema: schema_def = {
    name: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    storage_price: {
        type: 'INT',
        is_primary: false,
    },
    size: {
        type: 'INT',
        is_primary: false,
    },
};

export async function create_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query(
        'CREATE TABLE IF NOT EXISTS product ( \n' +
        'name VARCHAR(256) PRIMARY KEY NOT NULL, \n' +
        'storage_price INT, \n' +
        'size INT \n' +
        ');',
    );
}

export async function drop_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query( 'DROP TABLE IF EXISTS product;' );
}

export async function select ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'SELECT * FROM product WHERE name = $1', [args.name] );
}

export async function insert ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'INSERT INTO product VALUES ($1, $2, $3)', [args.name, args.storage_price, args.size] );
}

export async function update ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'UPDATE product SET storage_price = $1, size = $2 WHERE name = $3;', [args.storage_price, args.size, args.name] );
}

export async function del ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'DELETE FROM product WHERE name = $1;', [args.name] );
}
