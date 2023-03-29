#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
RUN apt-get update \
	&& apt-get install -y curl \
	&& apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx \
	&& curl -sL https://deb.nodesource.com/setup_lts.x | bash - \
	&& apt-get install -y nodejs
WORKDIR /src
COPY ["src/web/hobbystacks-web-react-dotnet/hobbystacks-web-react-dotnet.csproj", "src/web/hobbystacks-web-react-dotnet/"]
RUN dotnet restore "src/web/hobbystacks-web-react-dotnet/hobbystacks-web-react-dotnet.csproj"
COPY . .
WORKDIR "/src/src/web/hobbystacks-web-react-dotnet"
RUN dotnet build "hobbystacks-web-react-dotnet.csproj" -c Release -o /app/build

FROM build AS publish
ARG REACT_APP_ENVIRONMENT=production
ARG REACT_APP_API_CATALOG_BASEURL=https://hobbystacks.com
ARG REACT_APP_API_HISTORY_BASEURL=https://hobbystacks.com
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT
ENV REACT_APP_API_CATALOG_BASEURL=$REACT_APP_API_CATALOG_BASEURL
ENV REACT_APP_API_HISTORY_BASEURL=$REACT_APP_API_HISTORY_BASEURL
RUN dotnet publish "hobbystacks-web-react-dotnet.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "hobbystacks-web-react-dotnet.dll"]