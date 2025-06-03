
    async function carregaDadosDetalhes() {

      const financeiro = document.getElementById('financeiro')
      const tipo = document.getElementById('tipo')
      const info_sobre = document.getElementById('info_sobre')
      const carrosel = document.getElementById('carrosel')

      fetch(`http://localhost:3000/carros?id=${id}`)
      .then(res=>res.json())
      .then(data=>{

        let car=data[0]

        if(car.alugar!=true){
          
          document.getElementById('verificaAl').setAttribute("class", "d-none")
          document.getElementById('verificaAlRes').setAttribute("class", "d-none")
        }

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
        
        financeiro.innerHTML =`
          <h2><strong>Preço</strong></h2>
            <h1>R$ ${car.valor}</h1>
            <a href="#"><div class="simulaFin">Simular Financiamento</div></a>
        `;

        tipo.innerHTML =`
          <p>${car.ano}</p>
          <h1><strong>${car.marca} ${car.modelo}</strong></h1>
        `;

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
        else{
          let body = document.getElementById('body')
          let tela = document.createElement('div')
          body.innerHTML = ''
          tela.innerHTML =`Pagina não encontrada`
        }

      })

    }
    async function deletaDadosDetalhes() {
      fetch(`http://localhost:3000/carros?id=${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {
        window.location.href = window.location.origin + "/public/detalhes/home_ex.html"
      });
    }

