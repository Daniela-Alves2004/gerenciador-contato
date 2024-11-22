Claro! Vou melhorar o texto e formatá-lo em um estilo de README para facilitar a compreensão e documentação.

---

# Sistema de Gerenciamento de Contatos

## Descrição do Projeto

Este projeto consiste em um sistema de gerenciamento de contatos desenvolvido em JavaScript para a discplina de arquitetura de software referente a lista 1. O sistema permite aos usuários adicionar, remover, listar e buscar contatos através de uma interface de linha de comando (CLI). Foram aplicados padrões de projeto estruturais e comportamentais para garantir a flexibilidade e extensibilidade do código.

## Objetivo

Desenvolver um sistema de gerenciamento de contatos utilizando padrões de projeto em JavaScript, tanto estruturais quanto comportamentais, para assegurar que o sistema possa ser facilmente estendido no futuro sem a necessidade de modificar o código existente.

## Requisitos Iniciais

1. **Classe Contato**: Representa um contato com os atributos nome, telefone e email.
2. **Classe GerenciadorContatos**: Contém métodos para adicionar, remover e listar contatos, mantendo uma lista de contatos.
3. **Interface CLI**: Permite aos usuários interagirem com o sistema (adicionar, remover, listar e buscar contatos).
4. **Padrão Estrutural**: Garantir que a adição e remoção de contatos possam ser facilmente estendidas no futuro.
5. **Padrão Comportamental**: Implementar a funcionalidade de busca de contatos, garantindo que esta possa variar independentemente dos algoritmos de busca.

## Padrões de Projeto Utilizados

### Padrão Estrutural: Decorator

O padrão Decorator foi escolhido para a funcionalidade de adicionar e remover contatos. Este padrão permite que novas funcionalidades sejam adicionadas de maneira transparente aos objetos de contato sem modificar o código existente. 

**Implementação:**
- `ContatoDecorator`: Classe base para todos os decoradores, que define o método `execute`.
- `AdicionarContatoDecorator`: Adiciona a funcionalidade de adicionar um novo contato.
- `RemoverContatoDecorator`: Adiciona a funcionalidade de remover um contato existente.

### Padrão Comportamental: Strategy

O padrão Strategy foi escolhido para a funcionalidade de busca de contatos. Este padrão permite que diferentes algoritmos de busca sejam implementados e utilizados de forma intercambiável, sem alterar o código principal da aplicação.

**Implementação:**
- `BuscaStrategy`: Interface para as estratégias de busca, que define o método `buscar`.
- `BuscaSimplesStrategy`: Implementação concreta de uma estratégia de busca simples por nome.


