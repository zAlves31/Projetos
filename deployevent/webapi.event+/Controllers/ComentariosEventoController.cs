using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {
        ComentariosEventoRepository _comentariosEventoRepository = new ComentariosEventoRepository();

        private readonly ContentModeratorClient _contentModeratorClient;

        public ComentariosEventoController(ContentModeratorClient contentModeratorClient)
        {
            _contentModeratorClient = contentModeratorClient;
        }

        [HttpPost("ComentarioIA")]
        public async Task<IActionResult> PostIA(ComentariosEvento comentario)
        {
            try
            {
                if (string.IsNullOrEmpty(comentario.Descricao))
                {
                    return BadRequest("A descricao do comentario nao pode estar vazio ou nulo!");
                }

                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(comentario.Descricao));

                var moderationResult = await _contentModeratorClient.TextModeration
                    .ScreenTextAsync("text/plain", stream, "por", false, false, null, true);

                if (moderationResult.Terms != null)
                {
                    comentario.Exibe = false;

                    _comentariosEventoRepository.Cadastrar(comentario);

                }
                else
                {
                    comentario.Exibe = true;

                    _comentariosEventoRepository.Cadastrar(comentario);
                }

                return StatusCode(201, comentario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult Get(Guid id)
        {
            try
            {
                return Ok(_comentariosEventoRepository.Listar(id));
            }
            catch(Exception e) 
            { 
                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorIdUsuario")]
        public IActionResult GetByIdUser(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return Ok(_comentariosEventoRepository.BuscarPorIdUsuario(idUsuario, idEvento));
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult Post(ComentariosEvento novoComentario)
        {
            try
            {
                _comentariosEventoRepository.Cadastrar(novoComentario);
                
                return StatusCode(201, novoComentario);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _comentariosEventoRepository.Deletar(id);

                return StatusCode(204);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ListarSomenteExibe")]
        public IActionResult GetShow(Guid id)
        {
            try
            {
                return Ok(_comentariosEventoRepository.ListarSomenteExibe(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
