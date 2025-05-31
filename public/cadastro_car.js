async function postCar(contrato) {
  
        let valorContrato = contrato
        let marcaValor = document.getElementById('imput_marca').value
        let modeloValor = document.getElementById('imput_modelo').value
        let anoValor = document.getElementById('imput_ano').value
        let placaValor = document.getElementById('imput_placa').value
        let corValor = document.getElementById('imput_cor').value
        let kmValor = document.getElementById('imput_km').value
        let combValor = document.getElementById('imput_combustivel').value
        let cambioValor = document.getElementById('imput_cambio').value
        let precoValor = document.getElementById('imput_valor').value
        let motorValor = document.getElementById('imput_motor').value
        let dataValor = new Date().toISOString
        let opcionais = Array.from(document.querySelectorAll('input[name="opcionais"]:checked')).map(el => el.value)

        await fetch('http://localhost:3000/carros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
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
          })
}