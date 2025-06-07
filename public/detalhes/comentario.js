//FUNÇÃO QUE ADICIONA UM NOVO COMENTARIO AO JSON
async function postComent() {

  
    //PEGA O VALOR DO IMPUT AO CLICAR NO BOTÃO (DESKTOP)
    let comentario = document.getElementById('imputComent').value
    //PEGA O VALOR DO IMPUT AO CLICAR NO BOTÃO (MOBILE)
    let comentarioRes = document.getElementById('imputComentRes').value

    //IMPEDE QUE UM COMENTARIO EM BRANCO SEJA ENVIADO
    if(comentarioRes=='' && comentario==''){
      e.preventDefault()
    }

    //VERIFICA SE O COMENTARIO ENVIADO VEIO DO PAINEL DE COMENTARIOS MOBILE OU DESKTOP

    //SE O VALOR DO IMPUT MOBILE FOR VAZIO ENTÃO A FUNÇÃO FOI CHAMADA DO DESKTOP
    if (comentarioRes==''){

      await fetch('http://localhost:3000/comentario',{
          method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(
              {
                "idcar": id,
                "coment": comentario,
                "userId":1
              },
            ),
          })
      .then(res => res.json())
      .then(data => {})
    }
    //SE O VALOR DO IMPUT DESKTOP FOR VAZIO ENTÃO A FUNÇÃO FOI CHAMADA DO MOBILE
    else if(comentario==''){

      await fetch('http://localhost:3000/comentario',{
          method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(
              {
                "idcar": id,
                "coment": comentarioRes,
                "userId":1
              },
            ),
          })
      .then(res => res.json())
      .then(data => {})
    }
  }

//FUNÇÃO QUE ADICIONA UOS COMENTARIOS DO JSON NA PAGINA
async function getComent() {

     await fetch(`http://localhost:3000/comentario?idcar=${id}`)
        .then(res=>res.json())
        .then(data=>{

            //VERIFICA SE EXISTEM COMENTARIOS
            if(data.length>0){

              //LIMPA O INTERIOR DAS DIVS QUE CONTEM OS COMENTARIOS PARA EVITAR DUPLICAÇÃO
              document.getElementById('coment_read').innerHTML = ''
              document.getElementById('coment_readRes').innerHTML = ''
              
              for(let i =0; i < data.length; i++){

                  let dado = data[i]

                  //ADICIONA O COMENTARIO QUANDO EM DESKTOP
                  const cm = document.createElement('div')
                  cm.className = 'cm'

                  cm.innerHTML = `
                    <div class="comentHeader" > 
                      <div class="comentUser"></div>
                      <div class="btnComent" data-id="${dado.id}" > 
                        <button onclick="preparaUpdateComent(this)" class="btnComentUp" id="btnComentUp"> ✎ </button>
                        <button onclick="deleteComent(this)" class="btnComentDel" id="btnComentDel"> X </button>
                      </div>
                    </div>
                    <div class="coment"> 
                      ${dado.coment}
                    </div>
                  `

                  document.getElementById('coment_read').appendChild(cm)

                  //ADICIONA O COMENTARIO QUANDO EM MOBILE
                  const cmr = document.createElement('div')
                  cmr.className = 'cm'

                  cmr.innerHTML = `
                    <div class="comentHeader" > 
                      <div class="comentUser"></div>
                      <div class="btnComent" data-id="${dado.id}" > 
                        <button onclick="preparaUpdateComent(this)" class="btnComentUp" id="btnComentUp"> ✎ </button>
                        <button onclick="deleteComent(this)" class="btnComentDel" id="btnComentDel"> X </button>
                      </div>
                    </div>
                    <div class="coment"> 
                      ${dado.coment}
                    </div>
                  `
                  document.getElementById('coment_readRes').appendChild(cmr)

              }
            }
            //SE NÃO EXISTIR NENHUM COMENTARIO UMA MENSAGEM SERÁ MOSTRADA
            else{
              
              //ADICIONA A MENSAGEM QUANDO EM DESKTOP
              document.getElementById('coment_read').innerHTML = ''

              const cm = document.createElement('div')
              cm.className = 'cm'

              cm.innerHTML = '<h5> Nenhumm comentario foi postado até o momento</h5>'

              document.getElementById('coment_read').appendChild(cm)

              //ADICIONA A MENSAGEM QUANDO EM MOBILE
              document.getElementById('coment_readRes').innerHTML = ''

              const cmr = document.createElement('div')
              cmr.className = 'cm'

              cm.innerHTML = '<h5> Nenhumm comentario foi postado até o momento</h5>'

              document.getElementById('coment_readRes').appendChild(cmr)
            }
    })
}

//FUNÇÃO QUE DELETA UM COMENTARIO
async function deleteComent(idComent) {

  let idC = idComent.closest('.btnComent').getAttribute('data-id')

  fetch(`http://localhost:3000/comentario/${idC}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((json) => {
      
    });
}

//PREPARA O TERRENO PARA FAZER O FETCH DE PATCH
async function preparaUpdateComent(idComent) {

  //PEGA O ID DO COMENTARIO PRESENTE NO ATRIBUTO DATA-ID
  let idC = idComent.closest('.btnComent').getAttribute('data-id')

  await fetch(`http://localhost:3000/comentario/${idC}`)
        .then(res=> res.json())
        .then(data =>{

          //COLOCA O VALOR ORIGINAL DO COMENTARIO NO INPUT
          document.getElementById('imputComent').value = data.coment
          document.getElementById('imputComentRes').value = data.coment

          //MUDA O BOTÃO DE POST PRA UPDATE E PEGA O VALOR DO INPUT E CHAMA A FUNÇÃO QUANDO CLICADO (DESKTOP)
          document.getElementById('btnComentPost').setAttribute("class", "d-none")
          document.getElementById('btnComentUpdate').setAttribute("class", "d-block")
          document.getElementById('btnComentUpdate').addEventListener("click", function(){
            var newComent = document.getElementById('imputComent').value
            updateComent(idC, newComent)
          })

          //MUDA O BOTÃO DE POST PRA UPDATE E PEGA O VALOR DO INPUT E CHAMA A FUNÇÃO QUANDO CLICADO (MOBILE)
          document.getElementById('btnComentPostRes').setAttribute("class", "d-none")
          document.getElementById('btnComentUpdateRes').setAttribute("class", "d-block")
          document.getElementById('btnComentUpdateRes').addEventListener("click", function(){
             var newComentRes = document.getElementById('imputComentRes').value
            updateComent(idC, newComentRes )
          })
          
        })
}
//FUNÇÃO QUE ATUALIZA O CAMPO COMENT COM O NOVO VALOR DIGITADO
async function updateComent(idC, newComent) {

    await fetch(`http://localhost:3000/comentario/${idC}`,{
        method: "PATCH",
        headers:{
          'Content-Type': 'application/json; charset= UTF-8'
        },
        body: JSON.stringify({
          "coment": newComent,
        })
    })
    .then(res=>res.json())
    .then(data=>{
      
      //MUDA O BOTÃO DE UPDATE PRA POST
      
      document.getElementById('btnComentPost').setAttribute("class", "d-block")
      document.getElementById('btnComentUpdate').setAttribute("class", "d-none")
            
      document.getElementById('btnComentPostRes').setAttribute("class", "d-block")
      document.getElementById('btnComentUpdateRes').setAttribute("class", "d-none")
    })
}

   
