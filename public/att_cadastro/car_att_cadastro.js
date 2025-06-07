

const parans = new URLSearchParams(window.location.search)
let idU = parans.get('id')

function abreMenu(){
  document.getElementById('menuRes').setAttribute("class", "d-flex")
}
function fechaMenu(){
  document.getElementById('menuRes').setAttribute("class", "d-none")
}

async function carregaDadosPUT() {

    fetch(`http://localhost:3000/carros/${idU}`)
    .then(res=>res.json())
    .then(dados=>{

        document.getElementById('imput_marca').value =dados.marca
        document.getElementById('imput_modelo').value =dados.modelo
        document.getElementById('imput_ano').value =dados.ano
        document.getElementById('imput_placa').value =dados.placa
        document.getElementById('imput_cor').value =dados.cor
        document.getElementById('imput_km').value =dados.km
        document.getElementById('imput_combustivel').value=dados.tipoComb
        document.getElementById('imput_cambio').value=dados.cambio
        document.getElementById('imput_valor').value =dados.valor
        document.getElementById('imput_motor').value =dados.motor

        const checkboxes = document.querySelectorAll('input[name="opcionais"]');

        if(dados.alugar == true){
            aluguel.checked = true
        }
        else{
            compra.checked = true
        }
        dados.opcionais.forEach(item => {

          var cb = [...checkboxes].find(el => el.value === item);
          cb.checked = true
            
        });
    })
}

async function atualizaDados() {

    let valorContrato = contrato
    let marcaValor = document.getElementById('imput_marca').value.trim()
    let modeloValor = document.getElementById('imput_modelo').value.trim()
    let anoValor = document.getElementById('imput_ano').value.trim()
    let placaValor = document.getElementById('imput_placa').value.trim().toUpperCase()
    let corValor = document.getElementById('imput_cor').value.trim()
    let kmValor = document.getElementById('imput_km').value.trim()
    let combValor = document.getElementById('imput_combustivel').value
    let cambioValor = document.getElementById('imput_cambio').value
    let precoValor = document.getElementById('imput_valor').value.trim()
    let motorValor = document.getElementById('imput_motor').value.trim()
    let dataValor = new Date().toLocaleDateString('pt-BR')
    let opcionais = Array.from(document.querySelectorAll('input[name="opcionais"]:checked')).map(el => el.value)
    let uso = verificaUso()

    await fetch(`http://localhost:3000/carros/${idU}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json ; charset=UTF-8'
        },
        body: JSON.stringify(
            {
              "uso": uso,
              "alugar": valorContrato,
              "marca": marcaValor,
              "modelo": modeloValor,
              "ano": anoValor,
              "placa": placaValor,
              "cor": corValor,
              "km": kmValor,
              "tipoComb": combValor,
              "cambio": cambioValor,
              "valor": precoValor,
              "dataCadastro": dataValor,
              "motor": motorValor,
              "opcionais": opcionais
            },
        ),
    })
    .then(res=>res.json())
    .then(data=>{
        window.location.href = window.location.origin + `/public/detalhes/car.html?id=${idU}`
    })
}
function verificaUso(){
  let uso =''
  let km = document.getElementById('imput_km').value
  if(km==0){
    uso='novo'
  }
  else if(km>0 && km<=20000){
    uso='semi-novo'
  }
  else{
    uso='usado'
  }
  return uso
}