async function consultaMensagens(){ // Substituimos consyltaProdutos por consultaMensagens
    let mensagens = await fetch('http://localhost:3333/messages') // * Substituimos products por messages*/
        .then( resp => {
            return resp.json()
        })
        .catch( error => {
            alert('Erro ao buscar produtos')
        })
    let saida = ''    
    mensagens.forEach(mensagem => { // substituimos produto por mensagem e produtos por mensagens
        saida += `<option value="${mensagem.id}"> ${mensagem.title} </option>`
    }) // substituimos produto.id por mensagem.id e produto.description por mensagem.title
    document.getElementById("idSelecionado").innerHTML = saida
}

async function getPublished(id) {
    const message = await fetch(`http://localhost:3333/message/${id}`)
    .then (
        resp => {return resp.json()})
    .catch (
        error => {}
    )

    return message.published
}

async function darLike(){
    // recupera os dados do formulário
    const id = document.getElementById("idSelecionado").value
    if ( await
        getPublished(id) 
    ) { 

    
    const quantityLikes = Number(document.getElementById("quantityLikes").value) // Substituimos quantity por quantityLikes
    const corpo = {id, quantityLikes} // Substituimos quantity por quantityLikes
    const messageUp = await fetch('http://localhost:3333/message/like', { //substituimos prodUp por messageUp
                method: 'PATCH',
                body: JSON.stringify(corpo),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then (resp => {
                return resp.json()
            })
            
    alert(`Like dado com sucesso. A nova quantidade é ${messageUp.quantityLikes}`) 
} else {

    alert ('Erro, esta mensagem não foi publicada')
}
}