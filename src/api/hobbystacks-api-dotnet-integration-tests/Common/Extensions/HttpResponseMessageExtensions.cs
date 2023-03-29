using System.Net;

namespace HobbyStacks.Api.IntegrationTests.Common.Extensions;

public static class HttpResponseMessageExtensions
{
    public static async Task<HttpResponseMessage> EnsureSuccessStatusCodeReportResponseBodyAsync(this HttpResponseMessage message)
    {
        if (!message.IsSuccessStatusCode)
        {
            if (message.StatusCode == HttpStatusCode.InternalServerError)
            {
                throw new HttpRequestException(
                    string.Format(
                        System.Globalization.CultureInfo.InvariantCulture,
                        "Response status code does not indicate success: {0} ({1}).\n\n{2}",
                        (int)message.StatusCode,
                        message.ReasonPhrase,
                        await message.Content.ReadAsStringAsync()
                    )
                );
            }
            else
            {
                return message.EnsureSuccessStatusCode();
            }
        }

        return message;
    }
}
