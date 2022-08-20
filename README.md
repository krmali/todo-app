# todo-app
todo-app crud task

---
- [x] finsih api
- [x] add jwt authentication
- [x] frontend logic
- [x] integrate with the api
- [x] frontend styles
- [ ] add sso saml authentication

---

## links:
#### production: https://todo.krmali.xyz
#### simple saml idp: https://saml.krmali.xyz/simplesaml

---
## build environment instructions:
### for production env using postgres db
- make sure docker is installed
- git clone <repo>
- ```docker-compose -f docker-compose.yml up -d```

### for local env using postgres db
- make sure docker is installed
- git clone <repo>
- ```docker-compose -f docker-compose-local.yml up -d```

### rebuild docker-compose file after changes
- ```docker-compose -f docker-compose-local.yml up -d --build```

### destroy containers
- ```docker-compose -f docker-compose-local.yml down```

