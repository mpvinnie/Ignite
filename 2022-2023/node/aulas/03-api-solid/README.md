# APP

GymPass style app.

## RF (Requisitos funcionais)

O que possível o usuário fazer na aplicação.

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizado pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia.

## RNs (Regras de negócio)

Caminhos que cada requisito pode tomar;

- [X] O usuário não deve se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores.

## RNFs (Requisitos não funcionais)

Requisitos mais técnicos do que as funcionalidades em si;

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token).

## CI

Steps

```yml
  - uses: actions/checkout@v3 ## baixa o código
  - uses: actions/setup-node@v3 ## instala o node
      with:
        node-version: 18 ## versão do node
        cache: 'npm' ## mantem um cache das libs (só instala novamente se ouve alterações nas libs do package.json)
  - run: npm ci ## instala as dependências (porém sem interação com usuário, não atualiza versão, etc. apenas instala as dependências)
  - run: npm run test ## roda o script de testes
```
