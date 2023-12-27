
Install
- npm init
- add "type": "module" in package.json
- npm install express
- npm install @aws-sdk/client-dynamodb
- npm install @aws-sdk/lib-dynamodb

- *** TMP *** 
    - 1 fichier json "tokens.json" qui contient l'access token, le refresh token et la date d'expiration : pour l'instant récupéré du Raspberry... To do : les obtenir avec une première lecture (avec l'ID et le secret client)
    - 1 fichier json "strava.json" qui contient l'ID et le secret client // TO DO : les récupérer du secret manager AWS (nb : ils y sont déjà)
    
A venir : 
- npm install @aws-sdk/client-secrets-manager

Remarques : 
- ES6, so 
    * ""type" : "module"" in package.json
    * "import" instead of "require"
    * export default xxx  instead of module.export xxx