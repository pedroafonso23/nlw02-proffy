import { Request, Response } from 'express'

import db from '../database/connection'
import convertHoutToMinutes from '../utils/convertHourToMinutes'

// We have to inform TS the type of the variables inside scheduleItem
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query // Getting the information to make the filters

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes.'
            })
        }

        const timeInMinutes = convertHoutToMinutes(time)

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        return response.json(classes)
    }

    async create(request: Request, response: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body   // This will receive the info on request body, which is what the teacher filled in the form
    
        const trx = await db.transaction()  // Using this, if any insertion in the db goes wrong, everything associated will be canceled and reverted
    
        try {
            const insertedUsersIds = await trx('users').insert({ // The function insert returns an array with the IDs of the inserted itens
                name, avatar, whatsapp, bio
            })
        
            const user_id = insertedUsersIds[0] // We are inserting only one item, but it comes in an array, so we have to take the first element of the array
        
            const insertedClassesIds = await trx('classes').insert({
                subject, cost, user_id
            })
        
            const class_id = insertedClassesIds[0]  // Returns the ID of the last added class
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoutToMinutes(scheduleItem.from),
                    to: convertHoutToMinutes(scheduleItem.to)
                }
            })
        
            await trx('class_schedule').insert(classSchedule)
        
            await trx.commit()  // The transaction will only insert everything in the db at this point, if every insertion went well
        
            return response.status(201).send('Class created successfully!')
    
        } catch (err) {
            await trx.rollback()
    
            return response.status(400).json({
                error: 'Unexpected error while creating a new class.'
            })
        }
    }
}