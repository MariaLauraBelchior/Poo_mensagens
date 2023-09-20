// quem a chama não precisa aguardar a resposta para processar outra atividade
async function consultaMensagens(){ /* Substituimos consultaProduto por consultaMensagem*/
    // consome API no backend com verbo GET /product
    // é preciso esperar uma resposta para continuar
    const mensagens = await fetch('http://localhost:3333/messages') /* Substituimos products por messages*/
        .then( resposta => { // quando trouxe a resposta
            return resposta.json() // retorna os dados do servidor
        })
        .catch( error => {
            alert('Erro ao consultar')
        })
    
    // vamos percorrer o vetor produtos e jogar na tabela
    let linhasTabela = ''
    mensagens.forEach(mensagem => { /* Substituirmos produtos.forEach por mensagens.forEach e produto por mensagem */
        linhasTabela += `<tr> <td> ${mensagem.title} </td> <td> ${mensagem.content} </td> <td> ${mensagem.quantityLikes} </td> <td> ${mensagem.published} </td> <td> 
        <div onclick="remover('${mensagem.id}')"> <i class="bi bi-trash"></i> </div> </td> <td> <div onclick="editar('${mensagem.id}', '${mensagem.title}', ${mensagem.content}, ${mensagem.quantityLikes}, ${mensagem.published})" <i class="bi bi-pencil"></i> </div> </td> </tr>`
    })
    // vamos colocar o conteúdo na tabela
    document.getElementById("linhasTabela").innerHTML = linhasTabela
}

function editar(id, title, content, quantityLikes, published){
    document.getElementById("title").value = title /* alteramos description por title */
    document.getElementById("content").value = content /* alteramos price por content */
    document.getElementById("quantityLikes").value = quantityLikes /* alteramos quantity  por quantityLikes */
    document.getElementById("published").value = published /* criamos nova*/
    document.getElementById("id").value = id
}
async function remover(id){
    const confirma = confirm('Deseja realmente remover a mensagem?')
    if (!confirma){
        return // sai da função e não remove
    }
    // quer remover
    await fetch(`http://localhost:3333/message/id/${id}`, { /* alterou product por message*/
        method: 'DELETE'
    })
    .then(resposta => {
        alert('Remoção com sucesso')
    })
    .catch(erro => {
        alert('Problema na remoção')
    })
    // atualizar tabela
    consultaMensagens() /* alteramos consultaProdutos por consultaMensagens */
}

async function cadastrarMensagem(){ /* alteramos consultaProduto por consultaMensagem*/
    // recupera os dados do formulário
    const title = document.getElementById("title").value /* alteramos description por title*/
    const content = String(document.getElementById("content").value) /* alteramos price por content e o tipo de number para string*/
    const published = Boolean(document.getElementById("published").checked) /* criamos uma nova */
    const id = document.getElementById("id").value
    let metodo
    let url
    if (id) { // tem o id
        metodo = 'PUT'
        url = `http://localhost:3333/message/id/${id}` /* alteramos de product para message*/
        document.getElementById("id").value = ''
    }
    else {
        metodo = 'POST'
        url = `http://localhost:3333/message` /* alteramos de product para message*/
    }
    // mostra o objeto json
    const message = {title, content, published} /* alteramos const product por const message e as váriaves alteramos de description, price, quantity para title, content, quantityLikes e published*/
    // consome a api - verbo é post
    const novaMensagem = await fetch(url, { /*alteramos const novoProduto por const novaMensagem*/
        method: metodo,
        body: JSON.stringify(message), /* alteramos product por message*/
        headers: {
            'Content-Type': 'application/json;charset="UTF-8"'
        }
    })
    .then(resposta => {
        alert('Operação foi realizada com sucesso')
    })
    .catch(error => {
        alert('Erro durante a tentativa')
    })
    // atualiza a tabela no frontend
     consultaMensagens() /* alteramos consultaProdutos por consultaMensagens */
}