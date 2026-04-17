# Around The U.S.
Galeria de fotos interativa — explore e compartilhe lugares incríveis ao redor dos Estados Unidos.

## Sobre o projeto:
Around The U.S. é uma aplicação web de galeria de fotos onde o usuário pode gerenciar um perfil pessoal e uma coleção de cartões com locais e imagens. O projeto foi desenvolvido com HTML, CSS e JavaScript puros, sem frameworks externos.

### Funcionalidades
- Editar perfil
- Altere nome e descrição via modal


### Adicionar cartão
- Insira novos locais com título e URL


### Excluir cartão
- Remova cartões indesejados


### Curtir
- Marque locais favoritos


### Ampliar imagem
- Visualize fotos em tamanho maior


### 6 locais iniciais
- Cartões pré-carregados com destinos reais



## Como executar
Nenhuma dependência externa é necessária. Basta abrir o arquivo diretamente no navegador:

git clone https://github.com/seu-usuario/around-the-us.git
cd around-the-us
open index.html
Ou use uma extensão como Live Server no VS Code para recarregamento automático.



## Locais pré-carregados
- Vale de Yosemite
- Lago Louise
- Montanhas Carecas
- Latemar
- Parque Nacional da Vanoise
- Lago di Braies



## Principais decisões técnicas
### Template element
Os cartões são gerados a partir de um <template> no HTML, clonado via cloneNode(true) no JavaScript — evitando a construção manual de strings HTML.

### Modais com classe CSS
A abertura e fechamento dos popups é controlada adicionando/removendo a classe popup_is-opened, mantendo a lógica de UI separada da estrutura.

### Delegação de eventos
Cada cartão recebe seus próprios event listeners no momento da criação, incluindo like, exclusão e abertura de imagem.