using HobbyStacks.Api.Common.Services;

namespace HobbyStacks.Api.Common.Models;

public record class Result<TContent> : IResult<TContent>
{
    public const string InternalServerErrorMessage =
        "Something went wrong inside {MethodName} action: {ExceptionMessage}";

    public bool IsSuccess { get; init; } = false;
    public string[] Errors { get; init; } = Array.Empty<string>();
    public TContent? Content { get; init; } = default;

    public bool IsInternalServerError =>
        !IsSuccess &&
        Errors.Contains(InternalServerErrorMessage);
}
