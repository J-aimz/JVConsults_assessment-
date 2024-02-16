using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieAppApi.DTO;
using MovieAppApi.Interfaces;
using MovieAppApi.Utility;
using System.Buffers;

namespace MovieAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly ILogger<MovieController> _logger;
        private readonly IExternalCalls _apiCall;

        public MovieController(ILogger<MovieController> logger, IExternalCalls apiCall)
        {
            _logger = logger;
            _apiCall = apiCall;
        }


        [HttpGet("/movie/search")]
        public async Task<IActionResult> SerachForMovieByTitle([FromQuery] string title)
        {
            if (title is null || !(title.GetType() == typeof(string))) return BadRequest(ApiResponseDto.Failed("BadRequest"));

            string url = StaticDetails.ExternalUrl + "&s=" + title.ToString();

            _logger.LogInformation("Initiated title: {title} search at time: {time} ", title, DateTime.UtcNow);
            var result = await _apiCall.Send(url);

            if (result.IsSuccess && result.Result is not null)
            {
                _logger.LogInformation("Returning result at time: {time}", DateTime.UtcNow);
                return Ok(result);
            }

            if (result.IsSuccess && result.Result is null)
            {
                _logger.LogWarning("Result not found at time: {time}", DateTime.UtcNow);
                return NotFound(result);
            }

            _logger.LogError("Server error at time: {time}", DateTime.UtcNow);
            return StatusCode(500, result);
        }


        [HttpGet("/movie/{id}")]
        public async Task<IActionResult> GetMovieById(string id)
        {
            if (id is null || !(id.GetType() == typeof(string))) return BadRequest(ApiResponseDto.Failed("BadRequest"));
            string url = StaticDetails.ExternalUrl + "&i=" + id.ToString();

            _logger.LogInformation("Initiated movie search with id: {title} at time: {time} ", id, DateTime.UtcNow);
            var result = await _apiCall.Send(url);

            if (result.IsSuccess && result.Result is not null)
            {
                _logger.LogInformation("Returning result at time: {time}", DateTime.UtcNow);
                return Ok(result);
            }

            if (result.IsSuccess && result.Result is null)
            {
                _logger.LogWarning("Result not found at time: {time}", DateTime.UtcNow);
                return NotFound(result);
            }

            _logger.LogError("Server error at time: {time}", DateTime.UtcNow);
            return StatusCode(500, result);
        }

    }
}
