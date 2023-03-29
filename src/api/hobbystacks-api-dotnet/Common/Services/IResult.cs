namespace HobbyStacks.Api.Common.Services;

public interface IResult<TContent>
{
    public bool IsSuccess { get; }
    public string[] Errors { get; }
    public TContent? Content { get; }
}
