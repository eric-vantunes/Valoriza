# NLW Valoriza

NLW Valoriza (Next Level week - 6ª edição) rocket
nodejs-badge

Status do projeto:
Finalizado white_check_mark

Índice book
Descrição
Tecnologias
Rotas atuais
Regras do projeto
Aulas
- Aula 1 - Criando projeto
- Aula 2 - Criando estrutura de usuários
- Aula 3 - Criando estrutura de tags
- Aula 4 - Criando estrutura de elogios
- Aula 5 - Finalizando projeto
Descrição pushpin
Sistema para fazer elogio a outros usuários por meio de tags.

Tecnologias computer
Node.js - Baixe a versão recomendada LTS.
Yarn - Gerenciador de pacotes, similar ao npm do Node.js.
Express - Framework para desenvolver back-end com Node.js.
TypeScript - É JavaScript com tipagem de dados e recursos adicionais, voltado ao lado servidor.
Beekeeper - Gerenciador de Banco de Dados e editor de código SQL.
Insomnia - É um programa que testa as requisições de uma API(GET, POST, PUT, DELETE, PATCH, etc).
Execução white_check_mark
# Clone este repositório
$ git clone https://github.com/eric-vantunes/NLW-06

# Executar aplicação
$ yarn dev
O servidor vai se iniciar na porta :3000. Acesse no seu navegador a URL http://localhost:3000/ + rotas GET. Obs: browsers só tem suporte para fazer requisições de método GET. Baixe o Imsomnia para testar todas as rotas.

Rotas atuais do projeto arrow_right
POST
/tags -> Criar nova tag
/users -> Criar novo usuário
/login -> Auntenticar usuário
/compliments -> Cadastrar elogio (administrador)
GET
/tags -> Listas as tags cadastradas
/users -> Listar todos os usuários cadastrados
/users/compliments/send -> Listar elogios enviados
/users/compliments/receive -> Listar elogios recebidos
Regras do projeto
Cadastro de usuário

Aula 1 - Liftoff - Criando projeto (Anotações memo)
Origem e funcionamento do Node.js
Criado por Ryan Dahl, em 2009, pela necessidade de saber o progresso de seu upload, porém sempre precisar fazer novas requisições para saber a porcentagem do envio. Após pesquisas, Ryan percebeu que JavaScript aceita requisições assíncronas e iniciou o desenvolvimento do Node.js. Funcionamento: Usuários(lado cliente) fazem suas requisições(GET, POST, PUT, DELETE, etc), e a single thred de event loop do Node.js recebe essas requisições e as delega(repassa) para outras threads disponívies, dependendo do sistema, o número de threads disponíveis pode variar e as conecta a um banco de dados. Sendo assim, não há bloqueio de requisições(Non-blocking IO), então podemos fazer várias requisições simultâneas.

API(Application Programming Interface)
É um modelo/padrão que temos nosso projeto para separar o sistema do lado cliente(HTML, CSS, JavaScript, frameworks, etc) do lado servidor(regras de negócio, conexão com Banco de Dados, autenticação, etc). Então, teremos as requisições(request) do usuário por meio de rotas e o servidor lhe retorna uma resposta(response) em formato JSON.

Principais métodos HTTP
GET -> seleciona dados;
POST -> cadastra um dado;
PUT -> editar um dado;
DELETE -> deleta um dado;
PATCH -> altera um dado específico.
Obs: Os navegadores suportam somente os métodos GET ou POST por algum formulário.

Comandos básicos:
Inicialização e download de dependências
yarn init -y -> inicializa package.json no seu projeto. -y, no final do comando, faz o cadastro dos dados de nome, versão, main e licença automaticamente.
yarn tsc --init -> inicializa o TS.
yarn tsc -> converte TS para JS para o Node.js executar. O Node.js não compreende o TypeScript.
yarn add typescript -D -> adiciona o TypeScript em mode de desenvolvimento, quando for pra produção, o código será convertido para JavaScript.
yarn add express -> adiciona o framework express no projeto.
yarn add @types/express -D -> baixa as tipagens do express em modo de desenvolvimento.
yarn add ts-node-dev -D -> essa biblioteca converte arquivos TS em JS automaticamente, para não ficar criando arquivos com a extensão .js toda vez que queremos executar o projeto.
Execução
yarn dev -> Uma forma curta para executar o servidor na porta 3000. Definimos o comando dev dentro de "scripts", no package.json. Essa propriedade recebe o comando: ts-node-dev src/server.ts. Com essa configuração, não precisamos digitar yarn ts-node-dev src/server.ts toda vez que executarmos o projeto, somente yarn dev, agilizando o desenvolvimento.
Aula 2 - Maximun Speed - Criando estrutura de usuários (Anotações memo)
Tipos de parâmetros nas requisições(GET, POST, PUT, DELETE..)
Route params -> parâmetros dentro da rota. Ex: http://localhost:3000/livro/**69865498**
Query params -> filtro/pesquisa do usuário(parâmetro opcional). Ex: http://localhost:3000/jogo**?name=red-dead-redemption&price=100**
Body params -> são enviados dentro do corpo da requisição(POST, PUT e PATCH) como objeto dentro de um arquivo JSON.
Formas de usar banco de dados no projeto:
Inserir driver de um BD no projeto, porém temos que mexer com código SQL;
Knex.js: é um query builder(construtor de consultas). Não precisamos mexer tanto com sintaxe SQL e tem integração com vários tipos de Banco de Dados(MySQL, SQLite3, Postgres, etc);
TypeORM(Object Relacional Mapper): transforma objetos do código para entidade, assim o banco de dados compreende a sintaxe.
Obs: não é aconselhável usar SQLite com o projeto em produção por não ser tão robusto quando outros bancos.

Instalação
yarn add typeorm reflect-metadata sqlite3 -> baixa as 3 dependências de uma vez(). reflect-metadata nos permite adicionar os decorators(@) as classes e funções, lhes atribuindo um apelido.
Migrations
É um controle de versionamento de código SQL. Mantem a versão mais recente dos códigos do Banco de dados, assim todo time usa a mesma versão. Nesse projeto, é usado o TypeORM Migrations.

Documentação do TypeORM: https://typeorm.io/#/
Comandos de migration:
yarn typeorm migration:create -n NameEntity -> cria um arquivo de uma entidade
yarn typeorm migration:run-> cadastra a migration com os dados SQL digitados
yarn typeorm migration:revert-> remove a última migration cadastrada
Camadas do projeto:
Entity -> fica registrado as entidades que serão passadas pro banco
Repository -> responsável por fazer a comunicação entre a entidade e o BD.
Service -> as regras gerais do projeto, responsável pela autenticação, verificação, etc.
Controller -> Igual os métodos request, response. Nesse caso, o Controller recebe as informações do servidor e as passa para a camada Service.
Arquivo criado routes.ts -> arquivo onde ficarão as rotas que serão passadas para o Controller.

Aula 3 - In Orbit - Criando estrutura de tags(Anotações memo)
Middleware
Intercepta a nossa rota, ou seja, faz a verificação para ver se o usuário pode continuar para seu destino pela requisição que ele fez. se não puder retornamos um Status Code com a mensagem do porquê. Então, o usaremos para tratar os erros ao invés de usar try, catch toda hora. No projeto, usamos para o seguinte caso: se o usuário tente acessar a rota para criar tags sem ser um admin, o middleware irá retornar um Erro Status 401: Unauthourized.

Funções
FindOne
É uma função que seleciona, em sintaxe SQL, um parâmetro. Ex: SELECT * FROM tags WHERE name = 'dado_passado';

NextFunction
Uma função do express, irá levar o usuário para a página requisitada, caso o middleware permitir o acesso após a verificação.

Comandos
yarn add express-async-erros -> biblioteca para tratar erros assíncronos.
Obs: Estamos criando as classes de repositórios, mesmo sem usá-la, para quando utilizarmos seus métodos não precisarmos fazer muitas alterações no projeto, caso o colocassemos em outra camada.

Aula 4 - Landing - Criando estrutura de elogios(Anotações memo)
JWT(Json Web Token) - O que é e como funciona
É um padrão de token onde pegamos os dados de usuário pelas requisições(GET, POST, etc), fazer a verificação se o usuário pode estar acessando aquela rota e autenticá-lo. Dessa forma, em vez de usar os dados de e-mail e senha toda hora, usamos o token. É codificado em 3 partes, divididos por um ponto, classificados em:

Header -> tipo do token, algoritmo pra criptografar os dados e gerar o token;
Payload -> São propriedades de informações de usuário, como seu id, email, nome, etc. Então quando passamos os dados do back pro front ou vice-versa, os dados são encriptografados no envio e descriptografados no destino por alguma biblioteca feita para isso. Porém, não passaremos informações sensíveis como senha;
Verify Assignature -> Irá criar uma verificação de assinaruto concatenando(juntando) o header e o payload, convertendo-os com o base64 e os juntando com a chave que definimos para então validar e gerar o token.
Instalação do JWT
yarn add jsonwebtoken -> instala sua bibloteca
yarn add @types/jsonwebtoken -D -> instala suas tipagens em ambiente de desenvolvimento;
Criptografia
Pra fazer a criptografia da senha, usaremos a lib(library ou biblioteca):

yarn add bcryptjs
yarn add @types/bcrypt
E importaremos seu método hash(), onde passamos a senha e o salt que é o tamanho da criptografia, por padrão usamos 8. Dessa forma, recebemos a senha e a encriptografamos antes de ser salva no banco. Agora a senha não irá aparecer nos registros salvos.

Autenticação
Vamos fazer a autenticação dentro da camada Service e vamos receber os dados de email e senha. Então, teremos 3 passos para fazer:

Verificar se email existe;
Confirmar se a senha está correta;
Gerar o token de autenticação: usaremos a função sign da biblioteca jwc, onde passamos os dados do payload e a chave de acesso que colocamos. Usamos o site MD5 Hash Generator para ter mais segurança. No site, digitamos um texto que irá ser convertido em um código MD5 hash e SHA1 hash, então podemos escolher um dos dois para ser a chave.
Obs: mesmo que o erro for no email ou na senha, é uma boa prática de segurança não responder exatamente onde está o erro. Pois caso uma pessoa mal-intencionada estiver acessando o sistema, ela irá saber o campo em que está o erro e atacar ali. Então, dizemos que ambos podem estar incorretos.

Dica: só usamos o await quando é retornado uma Promise.

Aula 5 - Surface Exploration - Finalizando projeto(Anotações memo)
Na aula anterior autenticamos o admin, agora iremos fazer o mesmo com o usuário. Então usaremos o middleware pra interceptar a rota e verificar se o usuário está mesmo autenticado para seguir ao seu destino. Então teremos os seguintes passos:

Receber o token gerado do usuário;
Validar se o token está preenchido;
Verificar se o token é válido;
Recuperar informações do usuário.
Obs: No Imsomnia, temos o Bearer token onde passamos o token gerado do usuário.

Vamos adicionar o user_id como um objeto que vai vir do request do usuário. Mas na biblioteca padrão, não temos ele, o TypeScript permite que sobrescrevamos algumas tipagens, então iremos adicionar essa nova tipagem em uma arquivo e pasta com o mesmo nome da lib(library) original e adicionar esse caminho na propriedade typeRoots, que são pacotes de tipagem do arquivo tsconfig.json para poder reconhecer essa tipagem adicionada.

Criamos mais 4 rotas:

lista de elogios enviados -> /users/compliments/send (Método POST)
lista de elogios recebidos -> /users/compliments/send (Método POST)
lista de usuários cadastrados -> /users (Método GET)
lista de tags cadastradas -> /tags (Método GET)
Também garantindo que o usuário esteja autenticado antes de ir para o seu destino.

Funções
end() -> retorna response padrão do status. Ex: response.status(401).end();

find() -> retorna todos os registros. classToPlain() -> irá criar novos objetos a partir dos objetos que ela recebe, faz parte da biblioteca class-transformer.

Podemos também trazer todas as informações da listagem de elogios recebidos e enviados com o relations:["nameObject"] após a propriedade where de sua camada Service.

Obs: podemos ter rotas com o mesmo nome se elas forem de métodos diferentes.

... -> recupera todos os dados de um objeto. Ex: {...tag}.
Customizar dados
A biblioteca class-transformer nos permite customizar uma classe. No nosso caso, usaremos para dois casos:

Customizar tag pro usuário, usando o @Expose;
Excluir a coluna senha pro usuário, usando o @Exclude. E, no final, as retornaremos utilizando a função classToPlain() que transforma objetos da classe em objetos JS para serem passados em um JSON.
Instalação do class-transformer
yarn add class-transformer

## Regras

- Cadastro de usuário

   [x] Nao é permitido cadastrar mais de um usuario com o mesmo email

   [x] Nao é permitido cadastrar usuario sem email

- Cadastro TAG

    [x] Nao é permitido cadastrar mais de uma tag com o mesmo nome 

    [x] Nao é permitido cadastrar tag sem nome 

    [x] Nao é permitido o cadastro por usuarios que nao sejam administradores

- Cadastro de elogios 

    [x] Nao é permitido um usuario cadastrar um elogio para si 

    [x] Nao é permitido cadastrar elogios para usuarios invalidos 

    [x] O usuário precisa estar autenticado na aplicacao 
