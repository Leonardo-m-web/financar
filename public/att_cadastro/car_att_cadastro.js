 

async function atualizaDadosDetalhes() {
    
    
    fetch(`http://localhost:3000/carros/${id}`)
    .then(res=>res.json())
    .then(dados=>{
        
        
        console.log(dados)
        var valido = true

        document.getElementById('imput_marca').setAttribute("value", `${dados.marca}`)
        document.getElementById('imput_modelo').setAttribute("value", `${dados.modelo}`)
        document.getElementById('imput_ano').setAttribute("value", `${dados.ano}`)
        document.getElementById('imput_placa').setAttribute("value", `${dados.placa}`)
        document.getElementById('imput_cor').setAttribute("value", `${dados.cor}`)
        document.getElementById('imput_km').setAttribute("value", `${dados.km}`)
        document.getElementById('imput_combustivel')
        document.getElementById('imput_cambio')
        document.getElementById('imput_valor').setAttribute("value", `${dados.valor}`)
        document.getElementById('imput_motor').setAttribute("value", `${dados.motor}`)
    })
}