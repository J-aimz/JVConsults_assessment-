using MovieAppApi.DTO;
using MovieAppApi.Interfaces;
using System.Text.Json;

namespace MovieAppApi.Services
{
    public class ExternalCalls : IExternalCalls
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly ILogger<ExternalCalls> _logger;

        public ExternalCalls(ILogger<ExternalCalls> logger) => _logger = logger;

        public async Task<ApiResponseDto> Send(string url)
        {
            try
            {
                _logger.LogInformation("Calling external api at time: {time}", DateTime.UtcNow);
                var result =  await _httpClient.GetAsync(url);

                if (result.IsSuccessStatusCode)
                {
                    _logger.LogInformation("External all successfull at time: {time}", DateTime.UtcNow);
                    var content = await result.Content.ReadAsStringAsync();
                    var data = JsonSerializer.Deserialize<object>(content);
                    return ApiResponseDto.Success(data);
                }
                else if (!result.IsSuccessStatusCode)
                {
                    _logger.LogError("External api failed with status code: {result.StatusCode} at time: {time}", result.StatusCode, DateTime.UtcNow);
                    return ApiResponseDto.Failed($"External api failed with status code: {result.StatusCode}");
                }

                _logger.LogWarning("External returned nothing at time: {time}", DateTime.UtcNow);
                return ApiResponseDto.Success(null);

            }
            catch (Exception ex)
            {
                _logger.LogInformation("Internal error with message: {msg} and error : {ex} at time: {time}", DateTime.UtcNow);
                return ApiResponseDto.Failed("Internal server error");
            }
        }
    }
}
