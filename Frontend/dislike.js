async function consultaMensagens(){ // Substituímos consultaProdutos por consultaMensagens
    let mensagens = await fetch('http://localhost:3333/messages') // * Substituimos products por messages*/
        .then( resp => {
            return resp.json()
        })
        .catch( error => {
            alert('Erro ao buscar produtos')
        })
    let saida = ''    
    mensagens.forEach(mensagem => { // Substituímos produtos por mensagens e produto por mensagem
        saida += `<option value="${mensagem.id}"> ${mensagem.title} </option>`
    }) // substituimos produto.id por mensagem.id e produto.description por mensagem.title
    document.getElementById("idSelecionado").innerHTML = saida
}

async function recuperaQuantidade() {
    console.log("aqui")
    const idSelecionado = document.getElementById("idSelecionado").value
    const message = await fetch(`http://localhost:3333/message/${idSelecionado}`) // Substituimos product por message
    .then(resp => {
        
        return resp.json()
    })
    .catch(error => {
        alert('Problema na consulta')
    })
    document.getElementById("disponivel").innerHTML = message.quantityLikes // Substituimos product.quantity por message.quantityLikes
     // Para retornar a quantidade disponível na tela
   
}

async function darDislike(){ // Substituímos vender por darDislike
    const id = document.getElementById("idSelecionado").value
    const quantityLikes = Number(document.getElementById("quantityLikes").value) // Substituímos quantity por quantityLikes
    const envia = {id, quantityLikes} // Substituímos quantity por quantityLikes
    const resp = await fetch('http://localhost:3333/message/dislike',{ // Substituimos product/venda por message/dislike
    method:'PATCH',
    body: JSON.stringify(envia),
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
.then(resp => {
    return  resp.json()
})

alert(resp.status)

}
