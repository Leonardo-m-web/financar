async function postComent() {

    let comentario = document.getElementById('coment_post').value
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

async function getComent() {

    fetch(`http://localhost:3000/comentario?idCar=${id}`)
        .then(res=>res.json())
        .then(data=>{

            if(data.length>0){

              document.getElementById('coment_read').innerHTML = ''
              for(let i =0; i < data.length; i++){

                  let dado = data[i]

                  const cm = document.createElement('div')
                  cm.className = 'cm'

                  cm.innerHTML = `
                    <div class="comentHeader" > 
                      <div class="comentUser"></div>
                      <div class="btnComent" > 
                        <button id="btnComentUp"> ✎ </button>
                        <button id="btnComentDel"> X </button>
                      </div>
                    </div>
                    <div class="coment"> 
                      ${dado.coment}
                    </div>
                  `
                  document.getElementById('coment_read').appendChild(cm)

              }
            }
            else{
              
              document.getElementById('coment_read').innerHTML = ''

              const cm = document.createElement('div')
              cm.className = 'cm'

              cm.innerHTML = '<h3> Nenhumm comentario foi postado até o momento</h3>'

              document.getElementById('coment_read').appendChild(cm)
            }
    })
}