const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Implemente uma classe Contato que represente um contato com os seguintes atributos: nome, telefone e email.
class Contato {
    constructor(nome, telefone, email) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }
    mostra() {
        console.log(`-----------------------\nNome: ${this.nome}\nTelefone: ${this.telefone}\nEmail: ${this.email}\n-----------------------\n`);
    }
}
//classe contructor que recebe gerenciador
class ContatoDecorator {
    constructor(gerenciador) {
        this.gerenciador = gerenciador;
    }
    execute() {
        throw new Error("Método execute() deve ser implementado.");
    }
}

// Adiona contato com nome, telefone e email
class AdicionarContatoDecorator extends ContatoDecorator {
    //contructor que recebe gerenciador usando super porqe é uma classe filha
    constructor(gerenciador, nome, telefone, email) {
        super(gerenciador);
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }

    execute() {
        if (!this.gerenciador.contatos.some(contato => contato.nome === this.nome)) {
            const novoContato = new Contato(this.nome, this.telefone, this.email);
            this.gerenciador.contatos.push(novoContato);
            console.log("Contato adicionado com sucesso!");
        } else {
            console.log("Este contato já existe!");
        }
        this.gerenciador.iniciarCLI(); 
    }
}

// Remove contato pelo nome
class RemoverContatoDecorator extends ContatoDecorator {
    constructor(gerenciador, nome) {
        super(gerenciador);
        this.nome = nome;
    }

    execute() {
        //encontra o index do contato pelo nome
        const index = this.gerenciador.contatos.findIndex(contato => contato.nome === this.nome);
        if (index !== -1) {
            this.gerenciador.contatos.splice(index, 1);
            console.log("Contato removido com sucesso!");
        } else {
            console.log("Contato não encontrado.");
        }
        this.gerenciador.iniciarCLI(); 
    }
}

// classe que implementa a estratégia de busca
class BuscaStrategy {
    buscar(gerenciador, nome) {
        throw new Error("Método buscar() deve ser implementado.");
    }
}

// Estratégia de busca simples
class BuscaSimplesStrategy extends BuscaStrategy {
    buscar(gerenciador, nome) {
        return gerenciador.contatos.find(contato => contato.nome === nome);
    }
}

// Classe GerenciadorContatos
class GerenciadorContatos {
    constructor() {
        this.contatos = [];
        this.buscaStrategy = new BuscaSimplesStrategy(); 
    }
    //chama os metodos de adicionar e remover contato
    adicionarContato(nome, telefone, email) {
        const decorador = new AdicionarContatoDecorator(this, nome, telefone, email);
        decorador.execute();
    }

    removerContato(nome) {
        const decorador = new RemoverContatoDecorator(this, nome);
        decorador.execute();
    }

    listarContatos() {
        if (this.contatos.length === 0) {
            console.log("Nenhum contato encontrado.");
        } else {
            console.log("Lista de contatos:");
            this.contatos.forEach(contato => contato.mostra());
        }
        this.iniciarCLI();
    }
    //chama o metodo buscar
    buscarContato(nome) {
        const contato = this.buscaStrategy.buscar(this, nome);
        if (contato) {
            contato.mostra();
        } else {
            console.log("Contato não encontrado!");
        }
        this.iniciarCLI();
    }
//Implemente uma interface simples de linha de comando (CLI) que permita aos usuários interagirem com o sistema (adicionar, remover, listar e buscar contatos).
    iniciarCLI() {
        rl.question(
            "\n======================\nEscolha uma opção:\n1 - Adicionar Contato\n2 - Remover Contato\n3 - Listar Contatos\n4 - Buscar Contato\n5 - Sair\n======================\n",
            (opcao) => {
                switch (opcao) {
                    case "1":
                        rl.question("Digite o nome do NOVO contato: ", (nome) => {
                            rl.question("Digite o número do NOVO contato: ", (telefone) => {
                                rl.question("Digite o email do NOVO contato: ", (email) => {
                                    this.adicionarContato(nome, telefone, email);
                                });
                            });
                        });
                        break;
                    case "2":
                        rl.question("Digite o nome do contato a ser REMOVIDO: ", (nome) => {
                            this.removerContato(nome);
                        });
                        break;
                    case "3":
                        this.listarContatos();
                        break;
                    case "4":
                        rl.question("Digite o nome do contato que deseja buscar: ", (nome) => {
                            this.buscarContato(nome);
                        });
                        break;
                    case "5":
                        console.log("Saindo do sistema.... \nAté mais!");
                        rl.close();
                        break;
                    default:
                        console.log("Opção inválida. Tente novamente.");
                        this.iniciarCLI();
                }
            }
        );
    }
}
//chama a classe gerenciador
const gerenciador = new GerenciadorContatos();
//inicia a CLI
gerenciador.iniciarCLI();
