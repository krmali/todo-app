# todo-app
todo-app crud task

---
- [x] finsih api
- [x] add jwt authentication
- [x] frontend logic
- [ ] integrate with the api
- [ ] frontend styles
- [ ] add sso saml authentication

---
## build environment instructions:
### for postgres db (recommended)
- make sure docker is installed
- git clone <repo>
- ```docker-compose -f docker-compose.yml up -d```

### rebuild docker-compose file after changes
- ```docker-compose -f docker-compose-postgres.yml up -d --build```

### destroy containers
- ```docker-compose -f docker-compose-postgres.yml down```

