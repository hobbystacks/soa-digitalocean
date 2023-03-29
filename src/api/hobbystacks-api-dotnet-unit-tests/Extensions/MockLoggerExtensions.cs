using Microsoft.Extensions.Logging;
using Moq;

namespace HobbyStacks.Api.UnitTests.Extensions;

internal static class MockLoggerExtensions
{
    public static void VerifyLog<T>(this Mock<ILogger<T>> logger, Func<Times> times)
    {
        logger.Verify(logger =>
            logger.Log(
                It.IsAny<LogLevel>(),
                It.IsAny<EventId>(),
                It.IsAny<It.IsAnyType>(),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()
            ),
            times
        );
    }

    public static void VerifyLog<T>(this Mock<ILogger<T>> logger, LogLevel logLevel, Func<Times> times)
    {
        logger.Verify(logger =>
            logger.Log(
                logLevel,
                It.IsAny<EventId>(),
                It.IsAny<It.IsAnyType>(),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()
            ),
            times
        );
    }

    public static void VerifyLog<T>(this Mock<ILogger<T>> logger, LogLevel logLevel, string message, Func<Times> times)
    {
        //logger.Verify(logger =>
        //    logger.Log(
        //        LogLevel.Error,
        //        It.IsAny<EventId>(),
        //        It.IsAny<It.IsAnyType>(),
        //        It.IsAny<Exception>(),
        //        It.IsAny<Func<It.IsAnyType, Exception?, string>>()
        //    ),
        //    Times.Once,
        //    message
        //);
        logger.Verify(logger =>
            logger.Log(
                logLevel,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString() == message),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()
            ),
            times
        );
    }
}
