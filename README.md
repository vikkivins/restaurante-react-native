# APP DE RESTAURANTE - ATIVIDADE FINAL

## Descrição do Projeto
Este é um aplicativo desenvolvido como parte de uma atividade final. O app é um sistema completo para gestão de um restaurante, com funcionalidades de **CRUD (Create, Read, Update, Delete)** e interação de dados com o **Firebase** e um arquivo local `DATA.JSON`.

### Funcionalidades Principais

1. **Splash Screen**:
   - Tela inicial exibida por 5 segundos ao abrir o app.

2. **Tela de Login/Cadastro**:
   - Permite que o usuário se cadastre ou faça login.
   - Após um login bem-sucedido, o usuário é redirecionado à **Home**.

3. **Navegação**:
   - Menu inferior:
     - Comidas
     - Bebidas
     - Drinks
     - Porções
     - Promoções
   - Menu lateral:
     - Home
     - Pesquisar Produto
     - Editar Produto
     - Cadastrar Produto

4. **Gestão de Produtos**:
   - **Edição**:
     - Produtos carregados do `DATA.JSON` não podem ser editados e são excluídos apenas temporariamente.
     - Produtos criados pelo usuário podem ser editados livremente.
     - Ao acessar a página de edição, o usuário pode selecionar o produto desejado.
   - **Exclusão**:
     - Produtos do `DATA.JSON` retornam após a atualização da página.
   - **Cadastro**:
     - O usuário pode cadastrar produtos fornecendo os dados:
       - Nome
       - Preço
       - Descrição
       - Categoria

5. **Pesquisa**:
   - Busca por termos parciais ou pelo nome completo do produto.

### Tecnologias Utilizadas
- **Frontend**: React Native
- **Backend**: Firebase
- **Dados Locais**: Arquivo `DATA.JSON`

### Estrutura do Projeto
- `src/json/DATA.JSON` - Contém os dados estáticos do projeto.
- `src/screens` - Componentes de tela como Login, Home, Cadastro, etc.
- `src/components` - Componentes reutilizáveis.

### Como Executar
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm start
   ```
4. Abra no emulador ou dispositivo físico via Expo Go.

---
Desenvolvido como parte de um projeto acadêmico. Obrigado por conferir!

