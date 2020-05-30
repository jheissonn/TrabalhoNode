
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
var fs = require('fs');
const moment = require('moment');
console.log('Iniciando leitura: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
readFile('./brasil.csv', 'utf-8', (err, fileContent) => {
    if(err) {
        console.log(err); 
        throw new Error(err);
    }
    console.log('Finalizado leitura: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
    converteCsvToJson(fileContent)
    .then(result => {
      escreveJson(result)
        .then(result => {console.log(result); })
          .catch(error => console.log("Erro ao escrever Json: " + error));
    })
    .catch(error => console.log("Erro ao converter Json: " + error));
});

function escreveJson(data){
    const promise = new Promise( (resolve, reject) => { 
                       try {
                        console.log('Iniciado escrita: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
                           fs.writeFileSync('arquivoConvertido.json', data);  
                           resolve('Finalizado escrita: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
                       } catch (error) {
                           reject(error);
                       }
                    });
    return promise;
}

function converteCsvToJson(fileContent){
    const promise = new Promise( (resolve, reject) => { 
                       try {
                        console.log('Iniciado conversão: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
                           let data = JSON.stringify(csvjson.toObject(fileContent));    
                           console.log('Finalizado conversão: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
                           resolve(data);
                       } catch (error) {
                           reject(error);
                       }
                    });
    return promise;
}
