import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary()
        table.string('subject').notNullable()
        table.decimal('cost').notNullable()

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')    // Reflects an alteration on everywhere
            .onDelete('CASCADE')    // If a teacher is deleted from the db, all of his classes are also deleted
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes')
}