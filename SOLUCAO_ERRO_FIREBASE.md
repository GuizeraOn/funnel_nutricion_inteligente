# ⚠️ Solução do Erro: "Missing or insufficient permissions"

Este erro acontece porque o **Firebase Firestore** bloqueia escritas por padrão para segurança. Você precisa liberar o acesso para que o usuário possa salvar seus próprios dados.

### Siga estes passos simples:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. Entre no seu projeto.
3. No menu lateral, clique em **Firestore Database**.
4. Clique na aba **Regras** (ou **Rules**).
5. Apague tudo o que está lá e cole o código abaixo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Regra para a coleção 'users'
    match /users/{userId} {
      // Permite ler e escrever APENAS se o usuário estiver logado 
      // E se o ID do usuário for igual ao ID do documento que ele está tentando acessar.
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
  }
}
```

6. Clique em **Publicar** (ou **Publish**).

Após fazer isso, o cadastro funcionará imediatamente!
