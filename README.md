## 📜 Sobre o Projeto
Este projeto tem como objetivo fornecer uma solução robusta para o gerenciamento de pedidos de vendas e compras. Desenvolvido com **NestJS** e **TypeScript**, com integração com backend NestJS.

### Funcionalidades:

1. **Cadastro de Pedidos de Vendas**  
   - **Interface para cadastrar uma nova venda**  
   - **Interface para visualizar todas as vendas**  

2. **Cadastro de Pedidos de Compras** (Não concluída)  
   - **Interface para cadastrar uma compra**, permitindo a escolha da venda e do(s) produto(s) que estão sendo comprados  
   - **Interface para visualizar todas as compras**  

---

## 🚀 Funcionalidades Concluídas

### 1️⃣ Cadastro de Pedidos de Vendas

A funcionalidade de **Cadastro de Pedidos de Vendas** foi implementada. Ela inclui:

- **Interface para cadastrar uma nova venda**:  
  Uma interface intuitiva para registrar novos pedidos de venda.

- **Interface para visualizar todas as vendas**:  
  Uma tela para exibir todos os pedidos de venda registrados no sistema, com a possibilidade de filtrar, editar ou excluir registros.

---

## 🚧 Funcionalidades em Andamento

### 2️⃣ Cadastro de Compras

O **Cadastro de Compras** está em andamento e contará com as seguintes funcionalidades:

- **Interface para cadastrar uma compra**:  
  Permite o registro de compras, associando à venda correspondente e aos produtos que estão sendo adquiridos.

- **Interface para visualizar todas as compras**:  
  Será possível visualizar todas as compras realizadas, com detalhes sobre os produtos adquiridos e suas respectivas vendas.

---

## 🚀 Scripts

Abaixo estão os principais scripts e etapas para o desenvolvimento e gerenciamento do projeto:

### 🏗️ Instalação das Dependências
Instale as dependências do projeto com o seguinte comando:
```sh
npm install
```

### 🛠️ Desenvolvimento
Para rodar o servidor em modo desenvolvimento, onde as alterações são aplicadas automaticamente, use:
```sh
npm run start:dev
```

### 🚀 Produção
Para rodar o servidor em modo produção, execute os seguintes passos:

1. **Compilar o código**:
    ```sh
    npm run build
    ```

2. **Iniciar o servidor em produção**:
    ```sh
    npm run start
    ```

---

## 📚 Documentação

Para mais informações sobre a arquitetura e as tecnologias utilizadas, consulte a documentação:

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

