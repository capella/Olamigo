# Olamigo
Um aplicativo simples para localizar pessoas ociosas.

##Referências
Tem uma tutorial muito bom de requisições REST [aqui](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/).
##Páginas
Segue abaixo a lista das páginas queno nosso aplicativo deve conter:

1. Login: pagina onde o usuario deve realizar o login com a api do facebook. Acho legal ter o logo do app e depois o batão de login do face.
2. Configurações
	* Selecionar Gostos: página que mostra uma lista gostos interessantes. 
		* Carregando: *POST* para 

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
Os códigos as senha e os codigos estão armazenadas no servidor. Para conseguir pegar essas informações utilizamos ium biblioteca chamada "config". Ela funciona como um grande objeto, por exemplo, para pegar o o nome do banco de dados usamos a variável *config.MYSQL.host*. O protótipo das configurações pode ser visto [aqui](server/config/default.json.example).

## Servidor
Montei um script que fica monitorando as atualizações no git. Quando a pasta *server* desse diretótio é atualizada, o servidor automaticamente é atualizado. A url do servidor é **http://melvans.cloudapp.net:9090/**.
Só para resaltar, vamos gerar as respostas das requisições em JSON. Acho que assim fica mais fácil.
