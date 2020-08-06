import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary()

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')    // Reflects an alteration on everywhere
            .onDelete('CASCADE')    // If a teacher is deleted from the db, all of his classes are also deleted
        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')
}