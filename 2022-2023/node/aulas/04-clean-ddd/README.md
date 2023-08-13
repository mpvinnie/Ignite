# DDD (Domain-driven Design)

Design dirigido à domínio

## Domínio

O domínio (domain) refere-se a um conjunto de conceitos, regras, processos e comportamentos que são fundamentais para um determinado negócio ou aplicação. É a área de conhecimento que descreve e organiza todo o conhecimento e entendimento necessário para desenvolver um software que atenda às necessidades do negócio ou aplicação.

O domínio é a base do DDD e é a partir dele que os modelos de negócio são construídos. Ele é composto por um conjunto de entidades, agregados, serviços e eventos que representam conceitos fundamentais do negócio. O conhecimento do domínio é essencial para que os desenvolvedores possam entender as necessidades do negócio e construir um software que atenda a essas necessidades de forma eficiente e eficaz.

Além disso, o DDD enfatiza a importância da comunicação clara e constante entre os desenvolvedores e os especialistas do domínio (conhecidos como especialistas do domínio ou domain experts), para que o conhecimento do domínio possa ser compartilhado e incorporado ao processo de desenvolvimento de software.

## Entidades

As entidades (entities) são objetos de domínio que representam conceitos importantes do negócio. Elas são responsáveis por encapsular o estado e o comportamento relacionado a esses conceitos, e são fundamentais para a modelagem do domínio.

Uma entidade é caracterizada por ter uma identidade única e constante, que a diferencia de outras entidades do mesmo tipo.

Elas são importantes para o DDD porque elas representam as principais abstrações do domínio, e a sua correta modelagem ajuda a garantir que o software reflita de forma precisa as regras e o comportamento do negócio. Além disso, as entidades costumam ser o ponto de entrada para outras operações do sistema, como validações, cálculos e regras de negócio específicas.

## Casos de uso

Os casos de uso (use cases) são uma técnica para descrever os requisitos funcionais de um sistema. Eles descrevem uma interação específica entre o usuário e o sistema, mostrando quais ações o usuário realiza e como o sistema responde a essas ações.

Eles são uma parte importante do processo de desenvolvimento de software, pois ajudam a definir os requisitos do sistema e a garantir que ele atenda às necessidades dos usuários finais.

## Linguagem ubíqua

A linguagem ubíqua (ubiquitous language) é uma técnica que consiste em usar uma linguagem comum, compreensível tanto para desenvolvedores quanto para especialistas do domínio, para descrever e entender os conceitos e processos do domínio em questão.

Ela é importante porque ajuda a alinhar a comunicação entre os membros da equipe de desenvolvimento e os especialistas do domínio. Usando uma linguagem comum, todos os envolvidos no projeto podem ter uma compreensão compartilhada dos termos e conceitos-chave do domínio, facilitando o desenvolvimento de um software que atenda às necessidades do negócio.

Além disso, ela deve ser incorporada no código-fonte do software e em documentos relacionados, como diagramas e documentação técnica, para garantir que todos os envolvidos usem a mesma terminologia. Dessa forma, a linguagem ubíqua ajuda a garantir que o software seja construído para atender às necessidades do negócio e que todos os envolvidos no projeto estejam na mesma página.

## Agregados

Um agregado (aggregate) é um conjunto de objetos de domínio que são tratados como uma unidade coesa. Eles são usados para delimitar transações consistentes de mudança de estado dentro do domínio.

Um agregado tem uma raiz de agregado (aggregate root), que é uma única entidade que é responsável por garantir a consistência do agregado como um todo. A raiz do agregado é a única entidade que pode ser referenciada de fora do agregado. Todas as outras entidades dentro do agregado só podem ser acessadas através da raiz do agregado.

O uso deles é uma das principais técnicas para gerenciar a complexidade em sistemas de software baseados em DDD. Ao definir os limites do agregado, é possível criar um modelo de domínio mais claro e focado, com transações e responsabilidades bem definidas para cada objeto no agregado.

## WatchedList

Lista observada, é um termo específico do padrão Aggregate.
É um Aggregate que representa uma coleção de itens (lista), onde os itens individuais podem ser 'observados' quando a mudanças. Isso geralmente significa que qualquer alteração em um item na lista é registrada e notificada para que os observadores sejam informados sobre as mudanças.

## Bounded Context

Bounded Context (contexto delimitado / subdomínio) é uma técnica para definir limites explícitos em torno de um conjunto de modelos de domínio. Cada Bounded Context é uma fronteira lógica que separa um modelo de domínio específico, com suas próprias regras, termos e limites, de outros modelos de domínio dentro do mesmo sistema.

Um Bounded Context pode ser visto como um subdomínio ou um setor de um sistema maior, onde as interações entre os objetos de domínio são altamente relacionadas. Dentro de um Bounded Context, as regras de negócio podem ser diferentes e podem ter nomes de entidades ou conceitos com significados distintos em outros contextos.

Essa técnica ajuda a evitar a confusão entre diferentes conceitos de negócio, evita a duplicação de código e reduz a complexidade do sistema. Cada Bounded Context pode ter sua própria arquitetura, padrões de projeto e tecnologias, permitindo que a equipe de desenvolvimento escolha as ferramentas mais adequadas para lidar com as especificidades do contexto.

Além disso, o DDD incentiva a comunicação clara e colaboração entre diferentes Bounded Contexts, por meio de integrações bem definidas e acordos claros de como os objetos de domínio serão compartilhados entre os contextos.

O estabelecimento de Bounded Contexts é uma parte importante da modelagem de um sistema baseado em DDD e deve ser conduzido em estreita colaboração entre a equipe de desenvolvimento e especialistas do domínio para garantir que as fronteiras do contexto sejam bem definidas e compreendidas.

## Value Objects

Um Value Object (objeto de valor) é uma classe que representa um valor que é importante para o domínio, mas que não possui identidade própria. Em outras palavras, um Value Object é um objeto que é definido pelos seus atributos, em vez de ser definido por uma identidade exclusiva.

Por exemplo, em um sistema de compras online, um Endereço pode ser modelado como um Value Object, pois não é importante manter um identificador único para cada endereço, mas sim os seus atributos, como rua, número, bairro, cidade, estado e CEP. Do ponto de vista do negócio, o endereço é apenas uma informação que precisa ser armazenada e consultada, não sendo uma entidade que precisa ser rastreada ou gerenciada.

Porém, é importante lembrar que nem todos os objetos sem identidade são necessariamente Value Objects. A decisão de modelar um objeto como um Value Object depende do contexto do domínio e da análise dos especialistas do negócio e da equipe de desenvolvimento.

## Eventos de domínio

Um evento de domínio (domain event) é uma notificação assíncrona que indica que algo importante aconteceu no domínio do sistema. Ele representa um fato ocorrido dentro do sistema que pode ser interessante para outras partes do sistema e pode ser usado para tomar decisões ou gerar novas ações.

Por exemplo, em um sistema de comércio eletrônico, um evento de domínio pode ser gerado quando uma nova compra é realizada com sucesso. Esse evento pode conter informações como o identificador da compra, o valor total, o endereço de entrega, entre outras informações relevantes para o domínio.

Eventos de domínio são importantes porque permitem que diferentes partes do sistema sejam notificadas e atualizadas quando ocorrem mudanças importantes no domínio. Eles também permitem que o sistema seja projetado de forma mais modular e escalável, pois diferentes partes do sistema podem ser projetadas para reagir a diferentes tipos de eventos, de forma independente.

## Subdomínios

Subdomínios são partes distintas e especializadas de um domínio complexo de software. Eles agrupam regras de negócios, terminologia e modelos relacionados, permitindo que equipes se concentrem em áreas específicas do sistema.

Dividir o domínio em subdomínios ajuda a lidar com a complexidade, facilita a colaboração e permite o desenvolvimento mais focado em partes individuais do sistema, enquanto as interações entre os subdomínios são cuidadosamente modeladas para garantir a coesão e a comunicação eficaz.

Existem 3 tipos de subdomínios

## Core

Aquilo que dá dinheiro. São as partes fundamentais de um domínio de software que abrigam as regras de negócios mais vitais e distintivas. Identificar e priorizar esses subdomínios permite que as equipes concentrem seus esforços em áreas cruciais para fornecer valor significativo ao negócio.

### Exemplo (core)

- `Carrinho de Compras`: Este subdomínio é essencial para um sistema de e-commerce, pois lida com as regras de negócios centrais, como adicionar, remover itens e calcular o total da compra. É uma parte fundamental da experiência de compra.
- `Gestão de Pedidos`: Este subdomínio trata do processamento de pedidos, rastreamento e gerenciamento de estados. Envolve ações como fazer pedidos, atualizar o status e notificar os clientes sobre mudanças no status do pedido.

## Supporting

Dá suporte para que o `Core` funcione. São partes do domínio de software que não são essenciais para a proposta principal de valor, mas desempenham um papel importante em atender a requisitos operacionais, regulatórios ou secundários. Eles completam o sistema além das funcionalidades centrais.

### Exemplo (supporting)

- `Autenticação e Contas de Usuário`: Embora não seja a principal proposta de valor, é crucial para o funcionamento do sistema. Lida com registro, login, recuperação de senha e gestão de perfis de usuário.
- `Gerenciamento de Inventário`: Responsável por controlar o estoque de produtos, notificar quando os níveis estão baixos e ajudar a manter a disponibilidade dos produtos.

## Generic

Você precisa dele, mas não são tão importantes. São partes do domínio de software que possuem funcionalidades reutilizáveis e abrangentes, não diretamente ligadas à proposta central de valor do negócio. Elas podem ser compartilhadas em várias partes do sistema, promovendo a eficiência e a consistência.

### Exemplo (generic)

- `Notificações`: Esse subdomínio pode fornecer serviços genéricos de notificação, como envio de e-mails, mensagens push ou SMS. Várias partes do sistema podem utilizar esses serviços para informar os usuários sobre diferentes eventos.
- `Gerenciamento de Pagamentos`: Embora parte do núcleo das operações, pode ser projetado como um subdomínio genérico para lidar com processamento de pagamentos, independente de onde e como os pagamentos são feitos.
