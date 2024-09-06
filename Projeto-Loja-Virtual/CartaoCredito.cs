namespace Projeto_loja_virtual
{
    public class CartaoCredito : Cartao
    {
        private DateTime data = DateTime.Now ;
        public float limite = 5000;

        public double juros { get; set; }

        public float parcelamento;

        public override void Pagar()
        {

            

            if (valor > limite)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Transacao negada, limite insuficiente");
                Console.ResetColor();
            }
            else
            {
                

                do
                {
                    Console.WriteLine($"Voce deseja parcelar em quantas vezes a sua compra?");
                    parcelamento = float.Parse(Console.ReadLine());

                    if (parcelamento > 1 && parcelamento <= 6)
                    {
                        juros = valor * 1.05 / parcelamento;
                    Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine($"O valor a ser pago é {parcelamento} parcelas de {juros:C2}");
                        Console.WriteLine($"Data do Pagamento: {data:f}");
                        
                    }
                    else if (parcelamento > 6 && parcelamento <= 12)
                    {
                        juros = valor * 1.08 / parcelamento;
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine($"O valor a ser pago é {parcelamento} parcelas de {juros:C2}");
                        Console.WriteLine($"Data do Pagamento: {data:f}");
                       
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"!!! Parcelamos somente em ate 12x !!!");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine($"Para tentar novamente Digite: 'Enter'");
                        Console.ResetColor();
                    }


                    Console.ReadKey();
                } while (parcelamento > 12);

            }

        }


    }


}