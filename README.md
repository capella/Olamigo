# Olamigo
Um aplicativo simples para localizar pessoas ociosas.

##Referências

##Páginas
Segue abaixo a lista das páginas queno nosso aplicativo deve conter:

1. Login: pagina onde o usuario deve realizar o login com a api do facebook. Acho legal ter o logo do app e depois o batão de login do face.
2.Configurações
⋅⋅* Selecionar Gostos: página que mostra uma lista gostos interessantes. Realiza uma requição *POST* para a u

##Senhas e números...
Os códigos as senha e os codigos estão armazenadas no servidor. Para conseguir pegar essas informações utilizamos ium biblioteca chamada "config". Ela funciona como um grande objeto, por exemplo, para pegar o o nome do banco de dados usamos a variável *config.MYSQL.host*. O protótipo das configurações pode ser visto [aqui](server/config/default.json.example).
