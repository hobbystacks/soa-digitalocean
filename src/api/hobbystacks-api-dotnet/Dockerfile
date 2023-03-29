#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/api/hobbystacks-api-dotnet/hobbystacks-api-dotnet.csproj", "src/api/hobbystacks-api-dotnet/"]
RUN dotnet restore "src/api/hobbystacks-api-dotnet/hobbystacks-api-dotnet.csproj"
COPY . .
WORKDIR "/src/src/api/hobbystacks-api-dotnet"
RUN dotnet build "hobbystacks-api-dotnet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "hobbystacks-api-dotnet.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "hobbystacks-api-dotnet.dll"]