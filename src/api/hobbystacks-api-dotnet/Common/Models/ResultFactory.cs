namespace HobbyStacks.Api.Common.Models;

public static class ResultFactory
{
    public static TResult Success<TResult, TContent>(TContent content)
        where TResult : Result<TContent>, new() =>
        new() { IsSuccess = true, Content = content };

    public static TResult Failure<TResult, TContent>(IEnumerable<string> errors)
        where TResult : Result<TContent>, new() =>
        new() { IsSuccess = false, Errors = errors.ToArray() };
}
