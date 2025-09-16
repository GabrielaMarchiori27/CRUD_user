# 📦 Instalar Node.js no Windows

## Problema Detectado
```
npm : O termo 'npm' não é reconhecido como nome de cmdlet
```

Isso significa que o Node.js não está instalado no seu sistema.

## ✅ Solução - Instalar Node.js

### 1. Download Node.js
- Acesse: https://nodejs.org
- Clique em **"Download Node.js (LTS)"**
- Versão recomendada: **18.x ou 20.x LTS**

### 2. Instalar
1. Execute o arquivo baixado (.msi)
2. Clique **"Next"** em todas as telas
3. **IMPORTANTE:** Marque a opção **"Add to PATH"**
4. Clique **"Install"**
5. Aguarde a instalação

### 3. Verificar Instalação
Abra um **novo** terminal (PowerShell ou CMD) e teste:
```bash
node --version
npm --version
```

**Deve retornar algo como:**
```
v18.17.0
9.6.7
```

### 4. Instalar Dependências do Projeto
```bash
cd C:\Users\User\CRUD_user
npm install
```

### 5. Testar o Projeto
```bash
npm start
```

## 🚨 Troubleshooting

### "npm ainda não é reconhecido"
- **Reinicie o terminal** (feche e abra novo)
- **Reinicie o VS Code** se estiver usando
- **Reinicie o computador** se necessário

### Erro de permissão
- Execute o terminal **como Administrador**
- Ou use: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Node.js já instalado mas não funciona
- Verifique se está no PATH: `echo $env:PATH`
- Reinstale o Node.js marcando "Add to PATH"

## 📱 Próximos Passos

Após instalar Node.js:
1. `npm install` (instalar dependências)
2. Corrigir connection string MongoDB
3. `npm start` (testar aplicação)
4. Deploy no Render
