using MovieAppApi.DTO;

namespace MovieAppApi.Interfaces
{
    public interface IExternalCalls
    {
        Task<ApiResponseDto> Send(string url);
    }
}
