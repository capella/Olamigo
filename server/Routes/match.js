/*Feito por Antonio 15:30 - 22:04*/

//Dependencies
var express = require('express');
var router = express.Router();

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');


/*Gera scores*/

exports.calc_score = function(arr_first, arr_second){
	var checker;
	var checked;
	var result = 0;
	if (arr_first.length < arr_second.length)
	{
		checker = arr_first;
		checked = arr_second;
	}
	else
	{
		checker = arr_second;
		checked = arr_first;
	}
	for (var i = 0; i < checker.length; i++)
		if (checked.indexOf(checker[i]) != -1)
			result++;

	return result;
}

exports.update_score = function(user, closer){

	var superuser;

	/*nomes que queremos*/
	var names = Array();
	for (var i = 0; i < closer.length; i++)
		names.push({name: closer[i].name})
	
	
	/*Encontra usuário mandado*/
	Person.find({name: user.name}, function (err, me){
		superuser = me[0];
		if (superuser.score == undefined)
		{
			Person.update({name: user.name}, {$set: {score: []}}, function (err, res){
				if (err)
					return err;
			})
		}
	})
	
	/*Todos os que me mandaram*/
	myquery = Person.find({});
	myquery.or(names);
	myquery.exec(function (err, result){
		if (err){
			return err;
		}
		else
		{
			for(var i = 0; i < result.length; i++)
			{
				/*Limpa do user recebido ocorrencias com name de result[i]*/
				Person.update({name: user.name}, {$pull: {score: {name: result[i].name }}}, function (err, res){
					if (err){
						return err;
					}
				})
							
				var man = exports.calc_score(superuser.gostos, result[i].gostos);	
				/*Cria o novo result[i]*/
				var my = {
					name: result[i].name,
					value: man
				}
				
				/*Joga em score*/
				Person.update({name: user.name}, {$push: {score: my}}, function (err, res){
					if (err){
						return err;
					}
				})
				
				/*Limpa de result[i] do user recebido*/
				Person.update({name: result[i].name}, {$pull: {$score: {name: user.name}}}, function (err, res){
					if (err)
						return err;
				})

				/*Cria novo user*/
				var my = {
					name: user.name,
					value: man
				}

				/*Coloca em score*/
				Person.update({name: result[i].name}, {$push: {score: my}}, function (err, res){
					if (err)
						return err;
				})
			}
		}
	})
	return 1;
}

module.exports = exports;
