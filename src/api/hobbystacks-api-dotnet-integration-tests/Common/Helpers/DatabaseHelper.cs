using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HobbyStacks.Api.IntegrationTests.Common.Helpers
{
    internal class DatabaseHelper
    {
        public static string GetShortUnique()
        {
            var salt = new Random().Next(99);
            return $"{Environment.ProcessId}${salt:N2}${DateTime.Now.Millisecond}";
        }
    }
}
