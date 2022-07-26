<h1 align='center'>
Ignews Blog 💻
</h1>

https://user-images.githubusercontent.com/53953937/180615002-2203dc63-6d01-487c-bf37-87020aa3fd72.mp4

## 📃 Sobre o projeto

Um blog privado que possui autenticação pelo Github com NextAuth, integração com Stripe para pagamentos e listagem de dados com GraphQL.

### Funcionalidades

- Autenticação pelo Github com NextAuth.
- Pagamentos via Stripe.
- Armazenamento de dados com FaunaDB.
- Listagem de dados com GraphQL através do ApolloClient.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Stripe](https://stripe.com/en-br)
- [FaunaDB](https://fauna.com/)
- [Sass](https://sass-lang.com/)
- [GraphQL](https://graphql.org/)
- [GraphCMS](https://hygraph.com/)
- [ApolloClient](https://www.apollographql.com/docs/react/)

## 💻 Cloning project

```bash
$ git clone https://github.com/IzaiasMorais/ignews.git && cd ignews
```

```bash
# Install the dependecies
$ npm i

# Create a OAuth App here o Github
1. Go to Settings / Developer settings / OAuth Apps
2. Create a new app
3. Set the homepage as 'https://yoururl/'
4. Set Authorization callback URL as 'http://yoururl/api/auth/callback'
5. Take the clientId and clientSecret key and replace in [...nextauth].ts on the code

# Run Stripe Webhook Listener
$ stripe listen --forward-to 'youurl/api/webhooks'

# Run the project
$ npm run dev
```





