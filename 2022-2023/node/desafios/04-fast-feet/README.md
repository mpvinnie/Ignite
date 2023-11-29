# Entities
- Admin
- Entregador
- Encomenda
- Destinatário

# Use cases

- [ ] A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- [ ] Deve ser possível realizar login com CPF e Senha
- [x] Deve ser possível realizar o CRUD dos entregadores
- [x] Deve ser possível realizar o CRUD das encomendas
- [x] Deve ser possível realizar o CRUD dos destinatários
- [x] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- [x] Deve ser possível retirar uma encomenda
- [ ] Deve ser possível marcar uma encomenda como entregue
- [x] Deve ser possível marcar uma encomenda como devolvida
- [ ] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- [ ] Deve ser possível alterar a senha de um usuário
- [x] Deve ser possível listar as entregas de um usuário
- [ ] Deve ser possível notificar o destinatário a cada alteração no status da encomenda

# Business Rules

- [ ] Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- [ ] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- [ ] Somente o entregador que retirou a encomenda pode marcar ela como entregue
- [ ] Somente o admin pode alterar a senha de um usuário
- [ ] Não deve ser possível um entregador listar as encomendas de outro entregador

[Link](https://efficient-sloth-d85.notion.site/Desafio-04-a3a2ef9297ad47b1a94f89b197274ffd)