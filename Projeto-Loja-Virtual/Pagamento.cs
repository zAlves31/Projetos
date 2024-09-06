
namespace Projeto_loja_virtual
{
    public class Pagamento
    {
        private DateTime data = DateTime.Now ;

        public float valor {get; set;}
        public string Cancelar()
        {
            Console.ForegroundColor = ConsoleColor.Red;
            return $"A Sua Compra foi Cancelada!";
            Console.ResetColor();
        }
    }
}