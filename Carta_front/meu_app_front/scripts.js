/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/buscacartas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.Cartas.forEach(item => insertList(item.nome_carta, item.nome_edicao, item.quantidade_copia, item.qualidade, item.idioma, item.extra, item.rotacao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (nome_carta, nome_edicao, quantidade_copia, qualidade, idioma, extra, rotacao) => {
  const formData = new FormData();
  formData.append('nome_carta', nome_carta);
  formData.append('nome_edicao', nome_edicao);
  formData.append('quantidade_copia', quantidade_copia);
  formData.append('qualidade', qualidade);
  formData.append('idioma', idioma);
  formData.append('extra', extra);
  formData.append('rotacao', rotacao);

  let url = 'http://127.0.0.1:5000/adicionacarta';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem, div)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item, nomeItem) => {
  console.log(nomeItem)
  delnomecarta = nomeItem.getElementsByTagName('td')[0].innerHTML
  delnomeedicao = nomeItem.getElementsByTagName('td')[1].innerHTML
  delqualidade = nomeItem.getElementsByTagName('td')[3].innerHTML 
  delidioma = nomeItem.getElementsByTagName('td')[4].innerHTML
  delextra = nomeItem.getElementsByTagName('td')[5].innerHTML
  

  let url = 'http://127.0.0.1:5000/deletacarta?nome_carta=' + delnomecarta + '&nome_edicao=' + delnomeedicao + '&qualidade=' + delqualidade + '&idioma=' + delidioma + '&extra=' + delextra;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome da carta, quantidade, idioma, edição, qualidade, extra e rotação
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputCarta = document.getElementById("nome_carta").value;
  let inputQuantidade = document.getElementById("quantidade_copia").value;
  let inputIdioma = document.getElementById("idioma").value;
  let inputEdicao = document.getElementById("nome_edicao").value;
  let inputQualidade = document.getElementById("qualidade").value;
  let inputExtra = document.getElementById("extra").value;
  let inputRotacao = document.getElementById("rotacao").value;

  if (inputCarta === '') {
    alert("Escreva o nome de uma carta!");
  } else if (inputEdicao === '') {
    alert("Escolha uma Edição!");
  } else if (inputQuantidade === '') {
    alert("Quantidade precisa ser fornecida!");
  } else if (isNaN(inputQuantidade)) {
    alert("Quantidade precisa ser numeral!");
  } else if (inputQualidade === '') {
    alert("Escolha uma Qualidade!");
  } else if (inputIdioma === '') {
    alert("Escolha um idioma!");
  } else if (inputExtra === '') {
    alert("Escolha um Extra!");
  } else if (inputRotacao === '') {
    alert("Identifique com sim ou não se a carta pode ser usada na rotação!");
  } else {
    insertList(inputCarta,  inputEdicao, inputQuantidade, inputQualidade, inputIdioma, inputExtra, inputRotacao)
    postItem(inputCarta,  inputEdicao, inputQuantidade, inputQualidade, inputIdioma, inputExtra, inputRotacao)
    alert("Carta adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome_carta, nome_edicao, quantidade_copia, qualidade, idioma, extra, rotacao) => {
  var item = [nome_carta, nome_edicao, quantidade_copia, qualidade, idioma, extra, rotacao]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("nome_carta").value = "";
  document.getElementById("nome_edicao").value = "";
  document.getElementById("quantidade_copia").value = "";
  document.getElementById("qualidade").value = "";
  document.getElementById("idioma").value = ""; 
  document.getElementById("extra").value = "";
  document.getElementById("rotacao").value = "";


  removeElement()
}