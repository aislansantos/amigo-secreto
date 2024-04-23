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
- O painel de administração vaiter senha única.

#### Retorna todos os itens

```http
  GET /customers/:id
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/:id
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.
