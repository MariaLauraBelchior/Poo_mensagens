
// importa a dependência ZOD
import {z} from 'zod'
import {prisma} from './lib/prisma'
import {FastifyInstance} from 'fastify'

export async function AppRoutes (server: FastifyInstance) {
// rota para consultar todos os produtos no banco de dados
// como vai consultar BD, a função tem que ser assíncrona

server.get('/messages', async () => { /* alteramos products por messages*/
    // await aguarda a resposta do BD
    const messages = await prisma.message.findMany() /* alteramos products por messages e prisma.product por prisma.message*/
    return messages /* alteramos products por messages*/
})

// rota para consultar os produtos que iniciam a descrição com uma palavra
// enviada pelo frontend (na variável request)
server.get('/message/:id', async (request) => { // alteramos de product para message
    // precisamos utilizar um esquema de tipo de dados para tratar tipo recebido do usuário
    // dependência ZOD
    // criando o objeto ZOD para a descrição
    const idParam = z.object({
        id: z.string().uuid()
    })
    // obtem o valor de description no parâmetro da rota
    const {id} = idParam.parse(request.params)
    // faz a consulta no banco de dados
    // select * from product where description = %description
    const message = prisma.message.findFirst({ // alteramos de product para message
        where: {
            id
        }
    })
    return message // alteramos de product para message
})

// cria rota para inserir mensagem
server.post('/message', async (request) => { // alteramos de product para message
        // cria objeto zod para definir esquema de dados do frontend
        const messageBody = z.object({ // alteramos de productBody para messageBody
            title: z.string(), // alteramos de description para title
            content: z.string(), // alteramos de price para content e z.number() para z.string()
            published: z.boolean()
        })
        // recupera os dados do frontend
        const {title, content,published} = messageBody.parse(request.body) // alteramos const {description, price, quantity} e productBody por const {title, content, quantityLikes

        // insere o mensagem no banco de dados
        const newMessage = prisma.message.create({ //alteramos const newProduct e prisma.product por const newMessage  e prisma.message
            data: {
                title: title, // alteramos description por title
                content: content, // alteramos price por content
                quantityLikes: 0, // alteramos quantity por quantityLikes
                published: published,
                created_at: new Date()
            }
        })
        return newMessage // alteramos newProduct para newMessage
})

// altera a quantidade de likes a partir de dar likes
server.patch('/message/like', async (request) => { // /product/compra por /message/like
    // cria objeto zod
    const likeBody = z.object({ // alteramos de compraBody para likeBody
        id: z.string().uuid(),
        quantityLikes: z.number() // alteramos quantity por quantityLikes
    })
    // recupera dados do frontend
    const {id, quantityLikes} = likeBody.parse(request.body) // alteramos quantity e compraBody para quantityLikes e likeBody

    // atualiza o quantity
    const messageUpdated = await prisma.message.update({ // alteramos productUpdated eeprisma.product.update por  messageUpdated e prisma.message.update
        where: {
            id: id
        },
        data: {
            quantityLikes: { // alteramos quantity por quantityLikes
                increment: quantityLikes // alteramos quantity por quantityLikes
            }
        }
    })
    return messageUpdated // alteramos productUpdated por messageUpdated
})

// Dislike da mensagem
server.patch('/message/dislike', async (request) => { // alteramos /product/venda' por /message/dislike

    //cria objeto zod para recuperar os dados
    const dislikeBody = z.object ({ // alteramos vendaBody por dislikeBody
        id: z.string().uuid(),
        quantityLikes: z.number() // alteramos quantity por quantityLikes
    })

// recupera os dados do frontend

const {id, quantityLikes} = dislikeBody.parse(request.body) // alteramos const {id, quantity} e vendaBody.parse para const {id, quantityLikes} e dislikeBody.parse

// atualiza o a quantidade de dislike 
const resp = await prisma.message.updateMany({// alteramos prisma.product.updateMany por prisma.message.updateMany
    where: {
        id: id,
        quantityLikes: { // alteramos quantity por quantityLikes
            gte: quantityLikes // alteramos quantity por quantityLikes
        }
    },
    data: {
        quantityLikes: { // alteramos quantity por quantityLikes
            decrement: quantityLikes // alteramos quantity por quantityLikes
        }

    }
})
    if (resp.count >= 1) {
        let aux = {
            "status": "Dislike realizado com sucesso"
        }
        return aux
    }
    else {
        let aux = {
            "status": "Dislike não pode ser maior que a quantidade de likes"
        }
        return aux

    }

})

// rota para atualizar a mensagem

server.put('/message/id/:id', async (request) => { //  alteramos product por message
    // criar um objeto zod para o id

    const idParam = z.object ({
        id: z.string().uuid()
    })

    // objeto zod para body
    const putBody = z.object({
        title: z.string(), // alteramos description para title
        quantityLikes: z.number(), // alteramos quantity para quantityLikes
        content: z.string() // alteramos price para content 
    })
    //recupera dados do frontend com o params
    const{id} = idParam.parse(request.params)

    // recupera dados do frontend com o body
    const {title, quantityLikes, content} = putBody.parse(request.body) // alteramos const {description, quantity, price} para const {title, quantityLikes, content}

    const messageUpdate = await prisma.message.update ({ // alteramos productUpdate e prisma.product.update para const messageUpdate e prisma.message.update
        where: {
            id: id
        },
        data: {
            title,// alteramos description para title
            quantityLikes, // alteramos quantity para quantityLikes
            content // alteramos price para content 
        }
    })

    return messageUpdate // alteramos productUpdate para messageUpdate
})

// rota para remover a mensagem
server.delete('/message/id/:id' , async (request) => { // alteramos product para message

    //objet zod para o id
    const idParam = z.object ({
        id: z.string().uuid()
    })
    // recupera dados do frontend com o params
    const {id} = idParam.parse(request.params)

    // remove do banco de dados
    const messageRemoved = await prisma.message.delete({ // alteramos de const productRemoved e prisma.product.delete para messageRemoved e prisma.message.delete
        where: {
            id
        }
    })
    return messageRemoved // alteramos de productRemoved para messageRemoved
})
}
