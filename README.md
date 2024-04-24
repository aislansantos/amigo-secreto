# Api Amigo-secreto

Sistema que visa resolver o problema de gerar um sorteio de amigo-secreto, para ter controle do evento, e administrar os dados referente aos Eventos, Grupos e Pessoas que irão participar,

## Documentação da API amigo secreto

### Backend

Sistema gerado para fazer algumas ações, dentre elas:

- Painel de Administração
  - Cadastrar Eventos;
  - Cadastrar Grupos;
  - Cadastrar Pessoas(participantes);

### Problema Principal

Em um sorteio deste tipo algumas combinações pode acarretar problemas, matematicamente falando, que podem contribuir para que o sorteio de errado.
Sendo feita um numero de vezes maximo, podemos mostrar para o usuário que o sorteio falhou.
Nesse caso por conta de termos grupos e eventos distintos a chance de dar algum erro é maior, se todos podessem sair com todos, esse sistema seria bem mais simples de resolver o problema em questão.

### Site

- Acessar tela do Evento;
- Colocar o CPF como info para identificar as pessoas;

### Caracteristicas

- Sorteio, acontece na hora do cadastro não na hora da IDENTIFICAÇÃO;
- A informação de quem tirou quem, não vai ser possível olhando diretamente dentro do database.
- O painel de administração vaiter senha

# Rotas API

## Rotas Teste

### Ping

Retorna json{pong: true} - mostando conexão do server, se estiver ok

```http
  GET /ping
```

## Rotas Iniciais

### Rotas administrativas

#### Login

```http
  POST /admin/login
```

| Parâmetro  | Tipo     | Descrição                                            |
| :--------- | :------- | :--------------------------------------------------- |
| `password` | `string` | **Obrigatório**. Passar a senha para receber o token |

#### Rotas Eventos

#### Lista todos os eventos

```http
  GET /admin/events
```

#### Dados um evento especifico

```http
  GET /admin/events/:id
```

| Parâmetro | Tipo     | Descrição                                     |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do evento que você quer |

#### Cria um evento novo

```http
  POST /admin/events
```

#### Edita um evento

```http
  PUT /admin/events/:id
```

| Parâmetro | Tipo     | Descrição                                             |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do evento que você quer alterar |

#### Deleta um evento

```http
  DELETE /admin/events/:id
```

| Parâmetro | Tipo     | Descrição                                             |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do evento que você quer deletar |

#### Rotas Grupos

#### Lista grupos por evento

```http
  GET /admin/events/:id_event/groups
```

| Parâmetro   | Tipo     | Descrição                                                      |
| :---------- | :------- | :------------------------------------------------------------- |
| `id_events` | `string` | **Obrigatório**. O ID do evento que você quer listas os grupos |

#### Dados de um grupo

```http
  GET /admin/events/:id_event/groups/:id
```

| Parâmetro  | Tipo     | Descrição                                           |
| :--------- | :------- | :-------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer       |
| `id`       | `string` | **Obrigatório**. O ID do grupo que se quer os dados |

#### Cria um grupo novo grupe em um evento especifico

```http
  POST /admin/events/:id_event/groups/
```

#### Edita as informações de um grupo

```http
  PUT /admin/events/:id_event/groups/
```

| Parâmetro  | Tipo     | Descrição                                           |
| :--------- | :------- | :-------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer       |
| `id`       | `string` | **Obrigatório**. O ID do grupo que se quer os dados |

#### Deleta um grupo

```http
  DELETE /admin/events/:id_event/groups/:id
```

| Parâmetro  | Tipo     | Descrição                                           |
| :--------- | :------- | :-------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer       |
| `id`       | `string` | **Obrigatório**. O ID do grupo que se quer os dados |

### Rotas Pessoas

#### Lista todas as pessoas de determinado grupo

```http
  GET /admin/events/:id_event/groups/:id_group/people
```

| Parâmetro  | Tipo     | Descrição                                                      |
| :--------- | :------- | :------------------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer listas os grupos |
| `id_group` | `string` | **Obrigatório**. O ID do grupo que você quer listas as pessoas |

#### Lista uma pessoa de determinado grupo

```http
  GET /admin/events/:id_event/groups/:id_group/people/:id
```

| Parâmetro  | Tipo     | Descrição                                                      |
| :--------- | :------- | :------------------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer listas os grupos |
| `id_group` | `string` | **Obrigatório**. O ID do grupo que você quer listas as pessoas |
| `id`       | `string` | **Obrigatório**. O ID da pessoal que ser quer os dados         |

#### Cria o cadatro novo de uma pessoa

```http
  GET /admin/events/:id_event/groups/:id_group/people
```

| Parâmetro  | Tipo     | Descrição                                                      |
| :--------- | :------- | :------------------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer listas os grupos |
| `id_group` | `string` | **Obrigatório**. O ID do grupo que você quer listas as pessoas |

#### Edita os dados de uma pessoa de determinado grupo

```http
  PUT /admin/events/:id_event/groups/:id_group/people/:id
```

| Parâmetro  | Tipo     | Descrição                                                      |
| :--------- | :------- | :------------------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer listas os grupos |
| `id_group` | `string` | **Obrigatório**. O ID do grupo que você quer listas as pessoas |
| `id`       | `string` | **Obrigatório**. O ID da pessoal que ser quer os dados         |

#### Deleta uma pessoa

```http
  DELETE /admin/events/:id_event/groups/:id_group/people/:id
```

| Parâmetro  | Tipo     | Descrição                                                      |
| :--------- | :------- | :------------------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer listas os grupos |
| `id_group` | `string` | **Obrigatório**. O ID do grupo que você quer listas as pessoas |
| `id`       | `string` | **Obrigatório**. O ID da pessoal que ser quer os dados         |

### Rotas Publicas

#### Lista todos os eventos - rota publica

```http
  GET /events/:id
```

#### Mostra uma pessoa - rota publica

```http
  GET /events/:id_event/person?cpf=123
```

| Parâmetro  | Tipo     | Descrição                                                    |
| :--------- | :------- | :----------------------------------------------------------- |
| `id_event` | `string` | **Obrigatório**. O ID do evento que você quer achar a pessoa |
| `cpf`      | `string` | **Obrigatório**. O cpf dda pessoa para saber do sorteio      |
