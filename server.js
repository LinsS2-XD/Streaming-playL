import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Helo, walcome to yor playlist'
})
    
server.post('/playlist', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {nmusicas, nomeplaylist, tempodeduracao } = request.body
    database.create({
        nmusicas: nmusicas,
        nomeplaylist: nomeplaylist,
        tempodeduracao: tempodeduracao
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/playlist', (request) => {
    const search = request.query.search

    console.log(search)
    
    const playlists = database.list(search)
   
    return playlists
})

server.put('/playlist/:id', (request, reply) => {

    const playlistId = request.params.id
    const {nmusicas, nomeplaylist, tempodeduracao} = request.body
    const playlist = database.update(playlistId, {
        nmusicas,
        nomeplaylist,
        tempodeduracao,
    })
    return reply.status(204).send()
})

server.delete('/playlist/:id', (request, reply) => {
    const playlistId = request.params.id

    database.delete(playlistId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})