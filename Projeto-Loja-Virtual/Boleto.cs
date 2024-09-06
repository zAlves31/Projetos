
namespace Projeto_loja_virtual

{

    public class Boleto : Pagamento
    {
        private DateTime data = DateTime.Now ;
        public void Registrar()
        {
            this.valor = this.valor * 0.88f;
        Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"Valor a ser pago, com desconto: {this.valor:C2}");
            Console.WriteLine($"Código de barras: {GerarCodigoBarras()}");
            Console.WriteLine($"Data do Pagamento: {data:f}");
        Console.ResetColor();
        }

        public string GerarCodigoBarras()
        {
            Random random = new Random();
            return random.Next(100000000, 999999999).ToString();

        }

    }


}