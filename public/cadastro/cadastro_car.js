
function abreMenu(){
  document.getElementById('menuRes').setAttribute("class", "d-flex")
}
function fechaMenu(){
  document.getElementById('menuRes').setAttribute("class", "d-none")
}
//FUNÇÃO QUE CRIA UM NOVO ITEM NO JSON COM OS DADOS VINDOS DO FORMULARIO
async function postCar(contrato) {

        //PEGA OS VALORES DOS INPUTS
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
        //PEGA A DATA EM QUE O FORMULARIO FOI ENVIADO
        let dataValor = new Date().toLocaleDateString('pt-BR')
        //PEGA TODOS OS VALORES DO CHECKBOXES OPCIONAIS MARCADOS E OS COLOCA EM UM ARRAY
        let opcionais = Array.from(document.querySelectorAll('input[name="opcionais"]:checked')).map(el => el.value)
        //CHAMA A FUNÇÃO PRA VERIFICAR A CLASSIFICAÇÃO DO VEICULO COM BASE NO SEU USO
        let uso = verificaUso()

        //CRIA UM ITEM NO JSON COM OS DADOS
        await fetch('http://localhost:3000/carros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
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
          .then(res => res.json())
          .then(data => {
            console.log(data)
            //MOVE O USUARIO PRA PAGINA DE DETALHES DO VEICULO CADASTRADO APOS OS DADOS TEREM SIDO ADICIONADOS
            window.location.href = window.location.origin + `/public/detalhes/car.html?id=${data.id}`
          })
}
//VERIFICA SE O VEICULO É CONSCIDERADO NOVO, SEMI-NOVO OU USADO BASEADO NA KILOMETRAGEM
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