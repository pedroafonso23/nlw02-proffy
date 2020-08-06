import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary()

        table.integer('week_day').notNullable()
        table.integer('from').notNullable()
        table.integer('to').notNullable()

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')    // Reflects an alteration on everywhere
            .onDelete('CASCADE')    // If a teacher is deleted from the db, all of his classes are also deleted
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule')
}