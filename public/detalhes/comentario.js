async function getPostComent() {

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
    
    await fetch(`http://localhost:3000/comentario`)
    .then(res=>res.json)
    .then(data=>{

        for(let i =0; i < data.length; i++){

            let dado = data[i]
            if(dado.idcar==id){
                
            }
            else{

            }
        }

    })
}