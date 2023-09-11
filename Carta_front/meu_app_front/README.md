# Meu Front

Este pequeno projeto faz parte da entrega do MVP da Pós de Engenharia de Software, da Sprint de Desenvolvimento Full Stack Básico. Nas próximas linhas irei dar uma breve visão do que foi projetado no meu front-end.

O objetivo deste projeto foi a criação de uma SPA que funcione como uma ajuda a uma pessoa que colecione MTG(Magig The Gathering), um jogo de cartas, possibilitando assim um melhor controle de quais cartas a pessoa tem em sua coleção.

Para possibilitar isso foi feita uma linha contendo campos e dropdowns para a inserção das informações das cartas. A inserção do nome e da quantidade de cópias é feita atráves de campos de texto. Já a inserção da edição, qualidade, idioma, extra e rotação são feitas através de dropdwns contendo as opções possíveis para o escopo do projeto. Com isso foi possível utilizar a rota de /adicionacarta e o método POST.

Após isso foi inserida uma tabela contendo todas as cartas colocadas no banco de dados criado com SQLite, possibilitando a visão da coleção do usuário e também a utilização da rota /buscacartas e do método GET. Por último também nessa tábela foi introduzido um botão para deletar uma das entradas colocadas, fazendo a utilização da rota /deletacarta e o método DELETE.

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.
