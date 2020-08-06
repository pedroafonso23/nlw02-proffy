import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

// Open port localhost:3333
app.listen(3333)



// --- Notations ---

// HTTP VERBS (METHODS)
// GET: Buscar ou listar um informação
// POST: Criar uma nova infromação
// PUT: Atualizar uma info existente
// DELETE: Deletar uma info existente
//
// Browsers always use GET METHOD, use INSOMNIA to test other methods
//
// Request Body: Dados para criação ou atualização de um registro (pedir -> /users    recuperar -> request.body)
// Route Params: Indentificar qual recurso eu quero atualizar ou deletar (pedir -> /users/:id    recuperar -> request.params)
// Query Params: Pginação, listagem, filtros (pedir -> /users?page=2&sort=name    recuperar -> request.query)
//
// Knex -> Query Builder em JS:
// Ao invés de: SELECT * FROM users   escrevemos: knex('users').select('*') 