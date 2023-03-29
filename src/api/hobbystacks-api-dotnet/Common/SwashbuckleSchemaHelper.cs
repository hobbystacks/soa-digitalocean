namespace HobbyStacks.Api.Common;

internal static class SwashbuckleSchemaHelper
{
    private static readonly Dictionary<string, int> _schemaNameRepetition = new Dictionary<string, int>();

    public static string GetSchemaId(Type type)
    {
        string id = type.Name;

        if (!_schemaNameRepetition.ContainsKey(id))
            _schemaNameRepetition.Add(id, 0);

        int count = (_schemaNameRepetition[id] + 1);
        _schemaNameRepetition[id] = count;

        return type.Name + (count > 1 ? count.ToString() : "");
    }
}
