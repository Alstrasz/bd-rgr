/* eslint-disable max-len */
import * as pg from 'pg';
import { schema_def } from '.';

export const schema: schema_def = {
    warehouse_address: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    product_name: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    order_id: {
        type: 'INT',
        is_primary: true,
    },
    client_name: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    transport_name: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    price: {
        type: 'INT',
        is_primary: false,
    },
    date: {
        type: 'TIMESTAMP',
        is_primary: false,
    },
    duration: {
        type: 'INTERVAL',
        is_primary: false,
    },
};

export async function create_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query(
        'CREATE TABLE IF NOT EXISTS transaction ( \n' +
        'warehouse_address VARCHAR(256) REFERENCES warehouse(address) NOT NULL, \n' +
        'product_name VARCHAR(256) REFERENCES product(name) NOT NULL, \n' +
        'order_id INT REFERENCES commission(id) NOT NULL, \n' +
        'client_name VARCHAR(256) REFERENCES client(name) NOT NULL, \n' +
        'transport_name VARCHAR(256) REFERENCES transport(name) NOT NULL, \n' +
        'price INT, \n' +
        'date TIMESTAMP, \n' +
        'duration INTERVAL, \n' +
        'UNIQUE ( warehouse_address, product_name, order_id, client_name, transport_name ),\n' +
        'PRIMARY KEY ( warehouse_address, product_name, order_id, client_name, transport_name )\n' +
        ');',
    );
}

export async function drop_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query( 'DROP TABLE IF EXISTS transaction;' );
}

export async function select ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'SELECT * FROM transaction WHERE (warehouse_address = $1 AND product_name = $2 AND order_id = $3 AND client_name = $4 AND transport_name = $5);',
        [args.warehouse_address, args.product_name, args.order_id, args.client_name, args.transport_name] );
}

export async function insert ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'INSERT INTO transaction VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
        [args.warehouse_address, args.product_name, args.order_id, args.client_name, args.transport_name, args.price, args.date, args.duration] );
}

export async function update ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'UPDATE transaction SET price = $6, date = $7, duration = $8 WHERE (warehouse_address = $1 AND product_name = $2 AND order_id = $3 AND client_name = $4 AND transport_name = $5);',
        [args.warehouse_address, args.product_name, args.order_id, args.client_name, args.transport_name, args.price, args.date, args.duration] );
}

export async function del ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'DELETE FROM transaction WHERE (warehouse_address = $1 AND product_name = $2 AND order_id = $3 AND client_name = $4 AND AND transport_name = $5);',
        [args.warehouse_address, args.product_name, args.order_id, args.client_name, args.transport_name] );
}
