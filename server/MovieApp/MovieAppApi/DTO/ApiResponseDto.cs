namespace MovieAppApi.DTO
{
    public class ApiResponseDto
    {
        public string Message { get; set; } = "";
        public bool IsSuccess { get; set; } = true;
        public object Result { get; set; }



        public static ApiResponseDto Success(object Result)
        {
            return new ApiResponseDto { Message = "Success", IsSuccess = true, Result = Result };
        }


        public static ApiResponseDto Failed(object Result, string message = "Failed")
        {
            return new ApiResponseDto { Message = message, IsSuccess = false, Result = Result };
        }
    }
}
