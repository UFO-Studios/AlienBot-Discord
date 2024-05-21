from debian
copy . /app
run apt update -y && apt install curl
run curl https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh | bash
cmd donet run /app/Program.cs
