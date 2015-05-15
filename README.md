# Olamigo
Um aplicativo simples para localizar pessoas ociosas.

##Referências
Tem uma tutorial muito bom de requisições REST [aqui](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/). Dentro de server/index.js tem também alguns exemplos.

IONIC: vamos usar ele para crar o aplicativo. Mais informações [aqui](http://ionicframework.com/).

Plugins nodejs: [expressjs](http://expressjs.com/), [config](https://github.com/lorenwest/node-config), [node-gcm](https://github.com/ToothlessGear/node-gcm)

Plugins cordova: [ngCordova](http://ngcordova.com/docs/install/), [org.apache.cordova.geolocation](http://ngcordova.com/docs/plugins/geolocation/), [phonegap-facebook-plugin](http://ngcordova.com/docs/plugins/facebook/)

Templates: [chat ionic](http://codepen.io/rossmartin/pen/XJmpQr)

Para testar as requisições REST tem um bom [programa para mac](https://github.com/mmattozzi/cocoa-rest-client/releases).

##Páginas
Segue abaixo a lista das páginas queno nosso aplicativo deve conter:

1. Login: pagina onde o usuario deve realizar o login com a api do facebook. Acho legal ter o logo do app e depois o batão de login do face. Qaundo o usuário loga com o face, ele deve mandar o nome dele, o deviceToken do dispositivo, o userID do face e o accessToken do face.
2. Configurações
	* Selecionar Gostos: página que mostra uma lista gostos interessantes. 
		* Carregando: *POST* para */gostos/* contendo *idface*. O servidor deve retornar uma lista de objetos contendo 3 campos: (nome, id, gosta) onde o nome dever ser a descrição do gosto, o id deve ser o id dele no banco de dados e gosta deve ser 0 ou 1, identificando se o usuário ja marcou esse como um gosto seu. 
		* Visual: lista simples contendo o todos os gostos salvos no banco de dados e ao lado dele deve haver checkboxs para selecionar se gosta ou não.
		* Salvando: *PUT* para */gostos/* com uma lista de ids do qual a pessoa marcou que gostou.
3. Página Principal: visualiza as atividades por perto.
	* Carregando:  *POST* para */atividades/* contendo *idface*. Retorna um objeto contendo o idatividade, descrição, responsavel_idface, distancia, horario_maximo e lista de ids de interesses. É interessante salvar toda essa lista em um modulo do angular. Assim fica fácil de pegar os dados.
	* Visual: quadrados contendo os primeiros x caracteres da atividade uma foto do sujeito responsavel e pequena e seu nome.
4. Visualizar Atividade: carrega a atividade que usuario clicou na página inicial.
	* Visual: foto do usuário, local onde mora e trabalho seguido da descrição completa da atividado. É legal colocar os interesses dele. Deve ter um botão bem nítido "SOLICITAR PARTICIPAÇÃO".
	* Solicitar participação: *POST* para */porticipar/* contendo *idface* e *idatividade*. Quando o server receber isso ele envia via GCM para o repsonsável um pedido. O servidor retorna numero_solicitacao. Avisa que o pedido foi solicitado e vai para Atividades solicitadas com o numero da solicitacao.
5. Atividades solicitadas: lista de todas as solicitações que o usuário fez ou que recebeu. 

* Menu Superior: tem um botão de "+" Quando apertado abre uma modal e permite o usuário escrever o que está com vontade de fazer. Acho legal ter um fiel de quanto tempo ele quer esperar até encontrar alguém.
	* Salvando: *POST* para */nova_atividade/* contendo o idface, descrcao e tempo_espera.

## Banco de Dados
Acho legal usar MYSQL mesmo, pois já tenho um cógigo interessante para fazer uma pesquisa baseada na distancia entre dois pontos. Segue abaixo esse código (tá bem feio):

```sql
BEGIN
 SELECT
  C.comentario AS text,
  (879190747-2*C.id) as id,
  TIMESTAMPDIFF(SECOND, C.time, CURRENT_TIMESTAMP()) AS time,
  IFNULL((SELECT
      SUM(r.value)
    FROM avaliacoes r
    WHERE C.`id` = r.`comentid`), 0) AS likes
FROM (SELECT
    z.lat,
    z.lon,
    z.`id`,
    z.`comentario`,
    z.`pai`,
    z.time,
    p.radius,
    p.distance_unit * DEGREES(ACOS(COS(RADIANS(p.latpoint)) * COS(RADIANS(z.lat)) * COS(RADIANS(p.longpoint - z.lon)) + SIN(RADIANS(p.latpoint)) * SIN(RADIANS(z.lat)))) AS distance
  FROM coment AS z
    JOIN (SELECT
        latIN AS latpoint,
        lonIN AS longpoint,
        0.2 AS radius,
        111.045 AS distance_unit) AS p
  WHERE z.lat BETWEEN p.latpoint - (p.radius / p.distance_unit) AND p.latpoint + (p.radius / p.distance_unit)
  AND z.lon BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint)))) AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))) AS C
WHERE distance <= radius
AND C.pai = 0
ORDER BY TIMESTAMPDIFF(SECOND, C.time, CURRENT_TIMESTAMP()) DESC LIMIT 70;
END
```

Vocês podem acessar o banco de dados [aqui](http://melvans.cloudapp.net/phpmyadmin/).

##Senhas e números...
Os códigos as senha e os codigos estão armazenadas no servidor. Para conseguir pegar essas informações utilizamos uma biblioteca chamada "config". Ela funciona como um grande objeto, por exemplo, para pegar o nome do banco de dados usamos a variável *config.MYSQL.host*. O protótipo das configurações pode ser visto [aqui](server/config/default.json.example).

## Servidor
Montei um script que fica monitorando as atualizações no git. Quando a pasta *server* desse diretótio é atualizada, o servidor automaticamente é atualizado. A url do servidor é **http://melvans.cloudapp.net:9090/**. O arquivo node executado é index.js.

Só para resaltar, vamos gerar as respostas das requisições em JSON. Acho que assim fica mais fácil.

Os módulos npm são atualizados automaticamente toda a vez que mudamos o server. Por isso, não adicione ao repositório sua pasta *server/node_modules*. Também não adicione o arquivo ".DS_Store" que o MAC cria. 
