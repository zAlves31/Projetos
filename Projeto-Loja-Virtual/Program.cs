using Projeto_loja_virtual;

Pagamento loja = new Pagamento();
Boleto bol = new Boleto();
Debito deb = new Debito();
CartaoCredito cred = new CartaoCredito();


string opcao;
string denovo;
float valorCompra;
Console.ForegroundColor = ConsoleColor.DarkBlue;
Console.WriteLine(@$"
--------------------------------------
|   Bem vindo a nossa loja virtual!  |
--------------------------------------
"); Console.ResetColor();

Console.ForegroundColor = ConsoleColor.White;
Console.WriteLine(@$"
       Escolha a forma de Pagamento:
    ====================================

    1 - Pagamento em Boleto
    2 - Pagamento em Cartão de Débito
    3 - Pagamento em Cartão de Crédito
    4 - Cancelar Operação

    0 - Sair do Sistema
    
            Escolha uma Opcão: 
    ");
opcao = Console.ReadLine();

if (opcao != "0" && opcao != "4")
{
    Console.WriteLine($"Informe o valor da compra:");
    valorCompra = float.Parse(Console.ReadLine());

    switch (opcao)
    {
        case "1":

            bol.valor = valorCompra;
            Console.WriteLine($"");
            bol.Registrar();
            Console.WriteLine($"");

            break;
        case "2":
            Console.WriteLine($"Digite o nome do titular do cartão:");
            deb.Titular = Console.ReadLine();
            Console.WriteLine($"Informe a Bandeira do cartão:");
            deb.Bandeira = Console.ReadLine();
            Console.WriteLine($"Informe o numero do cartão:");
            deb.NumeroCartao = Console.ReadLine();
            Console.WriteLine($"Informe o CVV do cartão:");
            deb.Cvv = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"As informações do cartao foram salvas!");
            Console.ResetColor();

            deb.valor = valorCompra;
            Console.WriteLine($"");
            deb.Pagar();
            Console.WriteLine($"");
            break;
        case "3":
            Console.WriteLine($"Digite o nome do titular do cartão:");
            cred.Titular = Console.ReadLine();
            Console.WriteLine($"Informe a Bandeira do cartão:");
            cred.Bandeira = Console.ReadLine();
            Console.WriteLine($"Informe o número do cartão:");
            cred.NumeroCartao = Console.ReadLine();
            Console.WriteLine($"Informe o CVV do cartão:");
            cred.Cvv = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"As informações do cartão foram salvas!");
            Console.ResetColor();

            cred.valor = valorCompra;
            Console.WriteLine($"");
            cred.Pagar();
            Console.WriteLine($"");
            break;
        case "4":
            Console.WriteLine($"");
            Console.WriteLine($"{loja.Cancelar()}");
            Console.WriteLine($"");
            break;
        default:
            Console.WriteLine($"");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Opção Inválida, Tente novamente e escolha uma opção válida!");
            Console.WriteLine($"");
            Console.ResetColor();
            break;
    }

    do
    {
        Console.ForegroundColor = ConsoleColor.White;
        Console.WriteLine(@$"
       Escolha a forma de Pagamento:
    ====================================

    1 - Pagamento em Boleto
    2 - Pagamento em Cartão de Débito
    3 - Pagamento em Cartão de Crédito
    4 - Cancelar Operação

    0 - Sair do Sistema
    
            Escolha uma Opcão: 
    ");
        opcao = Console.ReadLine();

        if (opcao != "0" && opcao != "4")
        {
            Console.WriteLine($"Informe o valor da compra:");
            valorCompra = float.Parse(Console.ReadLine());

            switch (opcao)
            {
                case "1":

                    bol.valor = valorCompra;
                    Console.WriteLine($"");
                    bol.Registrar();
                    Console.WriteLine($"");

                    break;
                case "2":
                    deb.SalvarCartao();
                    deb.valor = valorCompra;
                    Console.WriteLine($"");
                    deb.Pagar();
                    Console.WriteLine($"");
                    break;
                case "3":
                    cred.SalvarCartao();
                    cred.valor = valorCompra;
                    Console.WriteLine($"");
                    cred.Pagar();
                    Console.WriteLine($"");
                    break;
                default:
                    Console.WriteLine($"");
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Opcao Invalida, Tente novamente e escolha uma opcao valida!");
                    Console.WriteLine($"");
                    Console.ResetColor();
                    break;
            }
        }
        else if (opcao == "0")
        {
            Console.WriteLine($"");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Saindo do sistema!");
            Console.WriteLine($"");
            Console.ResetColor();
        }
        else
        {
            Console.WriteLine($"");
            Console.WriteLine($"{loja.Cancelar()}");
            Console.WriteLine($"");
        }

    } while (opcao != "0" && opcao != "4");
}
else if (opcao == "0")
{
    Console.WriteLine($"");
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"Saindo do sistema!");
    Console.WriteLine($"");
    Console.ResetColor();
}
else
{
    Console.WriteLine($"");
    Console.WriteLine($"{loja.Cancelar()}");
    Console.WriteLine($"");

}







