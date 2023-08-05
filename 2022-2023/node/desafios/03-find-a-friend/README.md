# App

FindAFriend app.

## RF

O que  é possível o usuário fazer na aplicação.

- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível se cadastrar como uma ORG;
- [ ] Deve ser possível realizar login como uma ORG;

## RN

Caminhos que cada requisito pode tomar.

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [ ] Uma ORG precisa ter um endereço e um número de Whatsapp;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via Whatsapp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

```ts
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['PUPPY', 'YOUNG_ADULT', 'MATURE_ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    energy_level: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
    independency_level: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
    environment: z.enum(['SPACIOUS', 'COMPACT', 'OPEN', 'LIMITED_SPACE', 'EXPANSIVE', 'CRAMPED']),
    adopted_at: z.date().nullable()
  })
```
