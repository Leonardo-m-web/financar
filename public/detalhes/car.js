    function abreMenu(){
      document.getElementById('menuRes').setAttribute("class", "d-flex")
    }
    function fechaMenu(){
      document.getElementById('menuRes').setAttribute("class", "d-none")
    }
    
    //FUNÇÃO QUE COLOCA OS DADOS NA PAGINA DE DETAHLES DINAMICAMENTE
    async function carregaDadosDetalhes() {

      const financeiro = document.getElementById('financeiro')
      const tipo = document.getElementById('tipo')
      const info_sobre = document.getElementById('info_sobre')
      const carrosel = document.getElementById('carrosel')
      const btnU = document.getElementById('btnU')

      fetch(`http://localhost:3000/carros?id=${id}`)
      .then(res=>res.json())
      .then(data=>{

        let car=data[0]

        //VERIFICA SE O VEICULO  É ALUGADO. SE NÃO FOR A ABA DE COMENTARIOS DO DESKTOP E DO MOBILE 
        // FICARA OCULTA
        if(car.alugar!=true){
          
          document.getElementById('verificaAl').setAttribute("class", "d-none")
          document.getElementById('verificaAlRes').setAttribute("class", "d-none")
        }

        //VERIFICA SE OS DADOS EXISTEM
        if (car){
        /*
        carrosel.innerHTML= `
          <div class="carousel-item active">
            <img src="${car.imagens.img1}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${car.imagens.img2}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${car.imagens.img3}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${car.imagens.img4}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${car.imagens.img5}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${car.imagens.img6}" class="d-block w-100" alt="...">
          </div> `;
          */
        
        //DIRECIONA A PAGINA DE UPDATE DE DADOS COM O ID DOS DADOS DO VEICULO
        btnU.setAttribute('href' , `../att_cadastro/car_att_cadastro.html?id=${car.id}`)

        //VALOR DO CARRO
        financeiro.innerHTML =`
          <h2><strong>Preço</strong></h2>
            <h1>R$ ${car.valor}</h1>
            <a href="#"><div class="simulaFin">Simular Financiamento</div></a>
        `;
        
        //MARCA MODELO E ANO DO CARRO
        tipo.innerHTML =`
          <p>${car.ano}</p>
          <h1><strong>${car.marca} ${car.modelo}</strong></h1>
        `;
        
        //INFORMAÇÕES PRINCIPAIS DO CARRO COMO TIPO DE CAMBIO E A KILOMETRAGEM
        info_sobre.innerHTML=`
        <div class="sobre">
              <h5>Cambio</h5>
              <p class="itm">${car.cambio}</p>
            </div>
            <div class="sobre">
              <h5>KM</h5>
              <p class="itm">${car.km} Km</p>
            </div>
            <div class="sobre">
              <h5>Fim placa</h5>
              <p class="itm"> ${car.placa.slice(-1)}</p>
            </div>
            <div class="sobre">
              <h5>Motor</h5>
              <p class="itm">${car.motor}</p>
            </div>
            <div class="sobre">
              <h5>Cor</h5>
              <p class="itm">${car.cor}</p>
            </div>
            <div class="sobre">
              <h5>Combustivel</h5>
              <p class="itm">${car.tipoComb}</p>
            </div>
        `;
        
        //CRIA VARIAS LI DE ACORDO COM A QUANTIDADE DE ITENS ADICIONAIS PRESENTES NO VEICULO
        const ulop = document.getElementById('ulOp')
        ulop.innerHTML = ''
        car.opcionais.forEach(item => {
          const pa = document.createElement('p')
          pa.innerHTML=`
          ${item}
          `
          ulop.appendChild(pa)
        });
        
        }
        //SE OS DADOS NÃO EXISTIREM UMA MENSAGEM SERÁ MOSTRADA
        else{
          let body = document.getElementById('body')
          let tela = document.createElement('div')
          body.innerHTML = ''
          tela.innerHTML =`Pagina não encontrada`
        }

      })

    }
    //FUNÇÃO QUE DELETA OS DADOS DO VEICULO E A SUA PAGINA DE DETALHES
    async function deletaDadosDetalhes() {
      fetch(`http://localhost:3000/carros/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {

        //APOS A EXCLUSÃO DOS DADOS O USUARIO É ENVIADO PARA A HOME.PAGE
        window.location.href = window.location.origin + "/public/detalhes/home_ex.html"
      });
    }

