

const Mysql = require("../infrastructure/persistance/mysql/connection");
const Validator = require("../infrastructure/service/validation/validation");
const EncryptionService = require("../infrastructure/service/authentication/encryption");
const TokenGeneratorService = require("../infrastructure/service/authentication/tokenGenerator");
//const ExceptionHandlingService = require("../infrastructure/Exceptions/exception");
const ExceptionHandlingService = require("../infrastructure/service/Exception/ExceptionHandle");

const RoutingValidator = require("../infrastructure/service/validation/routingValidation");


const prisma = require("@prisma/client");


const fs = require('fs');
const path = require('path');

module.exports = class Configuration{
    
     port;
     database;
     validation;
     appSecretKey;
     appAddress;
     encryption;
     tokenGenerator;
     exceptionHandling;
     routingValidator;
     attachmentDirectory; 

    constructor(){
        this.port = 3005;
        this.database = new Mysql();
        this.databasePrisma = new prisma.PrismaClient(),
        this.validation = new Validator();
        this.appSecretKey = "EbidirMicro";
        this.appAddress = `http://localhost:${this.port}`;
        this.encryption = new EncryptionService();
        this.tokenGenerator = new TokenGeneratorService();  
        this.exceptionHandling = new ExceptionHandlingService();       
        this.routingValidator = new RoutingValidator({databasePrisma: this.databasePrisma, exceptionHandling: this.exceptionHandling});
        // this.attachmentDirectory = '/var/www/ebidir_uploads';
        this.attachmentDirectory = path.join(__dirname, './uploads');
    }

    getDependencies(){
        try{
            return {
                port: this.port,
                database: this.database,
                databasePrisma: this.databasePrisma,
                validation: this.validation,
                appSecretKey: this.appSecretKey, 
                appAddress: this.appAddress,
                encryption: this.encryption,
                tokenGenerator: this.tokenGenerator,
                exceptionHandling: this.exceptionHandling,
                routingValidator: this.routingValidator,
                attachmentDirectory: this.attachmentDirectory,
            }

        }catch(error){
            console.log(error);
        }
    }


}