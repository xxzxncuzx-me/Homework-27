import fastify from "fastify";
import cors from '@fastify/cors';
import fastifyStatic from "@fastify/static";
import path from "path";
import {
    fileURLToPath
} from "url";
import {
    WebSocketServer
} from 'ws';

const webSocketServer = new WebSocketServer({ port: 7777 })

webSocketServer.on('connection', (client) => {
    client.on('message', data => {
        webSocketServer.clients.forEach(cl => {
            cl.send(`[${(new Date).toLocaleTimeString('uk')}] ${data}`)
        })
    })
})

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const server = fastify();
server.register(cors)
server.register(fastifyStatic, {
    root: path.join(__dirname, 'client'),
})

server.listen(5555).then(() => {
        console.log('connected')
    })
    .catch(err => {
        console.error(err)
    })