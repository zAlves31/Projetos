# Projeto de Loja de Pagamento Virtual

## Descrição

Este projeto é uma aplicação de console em C# que simula um sistema de pagamento virtual. O sistema permite que os usuários façam pagamentos utilizando diferentes métodos: boleto, cartão de crédito e cartão de débito. O objetivo é fornecer uma experiência simples e eficaz para realizar transações financeiras.

## Funcionalidades

- **Pagamento por Boleto:** O sistema gera um código de boleto que pode ser usado para pagamento. O usuário recebe o código e pode utilizá-lo conforme necessário.
- **Pagamento por Cartão de Crédito:** Permite que o usuário efetue pagamentos com cartão de crédito, considerando um limite pré-definido. Se o valor do pagamento exceder o limite, a transação é recusada.
- **Pagamento por Cartão de Débito:** Permite pagamentos com cartão de débito, respeitando um saldo limite. Transações que excedem esse limite também serão recusadas.

## Estrutura do Código

O código é estruturado para permitir fácil compreensão e manutenção, com as seguintes classes principais:

- **Program:** Classe principal que gerencia as interações do usuário e as opções de pagamento.
- **Pagamento:** Classe base que contém lógica comum para todos os métodos de pagamento.
- **Boleto:** Classe derivada que gera e gerencia o código do boleto.
- **CartaoCredito:** Classe derivada que lida com pagamentos utilizando cartão de crédito, incluindo verificação de limite.
- **CartaoDebito:** Classe derivada que lida com pagamentos utilizando cartão de débito, incluindo verificação de saldo.

## Trabalho em Grupo

Este projeto foi desenvolvido em grupo, onde aprendemos a trabalhar com branches e merges. Cada membro da equipe ficou responsável por diferentes funcionalidades, utilizando branches para organizar o trabalho. Ao final, fizemos o merge das branches para integrar todas as partes do projeto, garantindo um código coeso e colaborativo.
