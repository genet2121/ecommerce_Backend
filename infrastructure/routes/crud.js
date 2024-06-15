const express = require("express");


const Controller = require("../../controller/controllers");
const AuthService = require("../service/authentication/auth");
const prisma = require("@prisma/client");
const operators = require("../../application/Interface/operators");
const getEntities = require("../../application/entities/getEntity");

const calculatorBusinessPlan = require("../../application/scoring methods/businessplan");
const calculatorCompanyEconomic = require("../../application/scoring methods/BUS - companyeconomic");
const calculatorEconomic = require("../../application/scoring methods/IND - economic");
const calculatorPersonal = require("../../application/scoring methods/IND - personal");
const calculatorLoan = require("../../application/scoring methods/loan");



module.exports = class Crud {

    dependencies;
    router;

    constructor(deps) {
        this.dependencies = deps;
        this.router = express.Router();
    }

    getRoute() {

        const controllers = new Controller(this.dependencies);

        this.router.post("/create", async (req, res, next) => {
            try {

                if (!req.body.tableName) {
                    throw this.dependencies.exceptionHandling.throwError("requestBody must contain tableName property", 400);
                }
                if (!req.body.data) {
                    throw this.dependencies.exceptionHandling.throwError("requestBody must contain data property", 400);
                }

                let { tableName, data } = req.body;
                let model = await prisma.Prisma.ModelName[tableName];

                if (!model) {
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let record = null;

                if(model == "user" || model == "attachment"){
                    record = await controllers.getControllers()[tableName].create(req.user, data);
                }else{

                    let validated = await this.dependencies.routingValidator.validateRecord(model, data);
                    if(validated){

                        if(model == "businessplan") {
                            data = await calculatorBusinessPlan(data, req.user);
                        }
                        if(model == "personal") {

                            if(!["admin", "personal", "agent"].includes(req.user.Roles[0])) {
                                throw this.dependencies.exceptionHandling.throwError("Unauthorized access!", 500);
                            }

                            let found_personal = await this.dependencies.databasePrisma.personal.findFirst({
                                where:{
                                    user_id: data.user_id
                                }
                            });

                            if(found_personal) {
                                throw this.dependencies.exceptionHandling.throwError("personal Detail already created for this account!", 500);
                            }

                            data.score = calculatorPersonal(data);
                        }
                        if(model == "economic"){

                            if(!["admin", "personal", "agent"].includes(req.user.Roles[0])) {
                                throw this.dependencies.exceptionHandling.throwError("Unauthorized access!", 500);
                            }

                            const found_personal = await this.dependencies.databasePrisma.economic.findFirst({
                                where:{
                                    user_id: data.user_id
                                }
                            });

                            if(found_personal) {
                                throw this.dependencies.exceptionHandling.throwError("personal economic info already created for this account", 500);
                            }

                            data.score = calculatorEconomic(data);
                            data.current_loans = 0;
                            data.repaid_loans = 0;
                        }
                        if(model == "companyeconomic") {

                            if(!["admin", "company", "agent"].includes(req.user.Roles[0])) {
                                throw this.dependencies.exceptionHandling.throwError("Unauthorized access!", 500);
                            }

                            const found_record = await this.dependencies.databasePrisma.companyeconomic.findFirst({
                                where:{
                                    user_id: data.user_id
                                }
                            });

                            if(found_record) {
                                throw this.dependencies.exceptionHandling.throwError("company economic detail already created for this company", 500);
                            }

                            data.current_loans = 0;
                            data.repaid_loans = 0;
                            data.score = calculatorCompanyEconomic(data);
                        }
                        if(model == "loan"){

                            if(!data.user_id) {
                                throw new Error("User must be related to the loan!");
                            } else if(req.user.Roles.includes("bank")){
                                throw new Error("Bank Cannot Request loan!");
                            }

                            if(req.user.Roles.includes("personal") || req.user.Roles.includes("company")) {
                                data.user_id = req.user.Id;
                            }

                            let new_loan = await calculatorLoan(data);
                            data = new_loan;
                            data.status = "requested";
                        }

                        let cleanData =  getEntities(tableName, data);
                        
                        record = await this.dependencies.databasePrisma[tableName].create({
                           data: cleanData
                        });
                    }
                    
                }

                if (record) {
                    return res.status(200).json({
                        data: record
                    });
                }

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.get("/getform/:table/:id", async (req, res, next) => {

            const { type } = req.query;

            try {
           
                if (!req.params.table) {
                    throw this.dependencies.exceptionHandling.throwError("requestParms must contain table property", 400);
                }
                if (!req.params.id) {
                    throw this.dependencies.exceptionHandling.throwError("requestParms must contain id property", 400);
                }

                let model = await prisma.Prisma.ModelName[req.params.table];
    
                if (!model) {
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let include = {};
                let whereQuery = {id: parseInt(req.params.id)};

                if (type) {

                    if (model == "loan") {
                        include.bank_loan_bankTobank = true;
                    }
                }

                if (model == "personal") {

                    if(req.user?.Roles.includes("company")) {
                        throw new Error("company cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }
                    
                }

                if (model == "company") {

                    if(req.user?.Roles.includes("personal")) {
                        throw new Error("personal users cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.id = parseInt(req.user.companyId);
                    }

                }

                if (model == "bank") {

                    if(req.user?.Roles.includes("bank")) {
                        whereQuery.user_id = parseInt(req.user.Id);
                    }

                }

                if (model == "economic") {

                    if(req.user?.Roles.includes("company")) {
                        throw new Error("company users cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id);
                    }

                }

                if (model == "companyeconomic") {
                    
                    if(req.user?.Roles.includes("personal")) {
                        throw new Error("company users cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.user_id = parseInt(req.user.companyId);
                    }

                }

                if (model == "businessplan") {

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.company_id = parseInt(req.user.companyId)
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }

                }
                
                const record = await this.dependencies.databasePrisma[req.params.table].findUnique({
                    where: whereQuery,
                    include: include
                })

                if(!record){
                    throw this.dependencies.exceptionHandling.throwError("record not found", 404);
                }

                return res.status(200).json(record);
                
            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.post("/getlist/:tableName/:PageNumber/:PageSize", async (req, res, next) => {
            try {

                const { type } = req.query;
    
                let model = await prisma.Prisma.ModelName[req.params.tableName];

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let modelConfiguration = model.charAt(0).toUpperCase() + model.slice(1) + "ScalarFieldEnum";
                let columns = await Object.keys(prisma.Prisma[modelConfiguration])
    
                let {PageNumber, PageSize} = req.params;

                Object.keys(req.body).forEach(key => {    
                     if (!columns.includes(key)) {
                        console.log("column " + key + " not found in " + req.params.tableName + ". available columns are:- " + columns.join(", "));
                        throw this.dependencies.exceptionHandling.throwError("column '" + key + "' not found in " + req.params.tableName + ". available columns are:- " + columns.join(", "), 404);
                    }
                });
              
                let whereQuery = {};

                for (let key in req.body) {
                    switch (req.body[key].type) {
                        case "date":
                            switch (req.body[key].operator) {
                                case operators.GREATER:
                                    whereQuery[key] = { gt: req.body[key].value };
                                    break;
                                case operators.LESS:
                                    whereQuery[key] = { lt: req.body[key].value };
                                    break;
                                case operators.EQUAL:
                                    whereQuery[key] = req.body[key].value;
                                    break;
                                case operators.NOT:
                                    whereQuery[key] = { not: req.body[key].value };
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "number":
                            switch (req.body[key].operator) {
                                case operators.GREATER:
                                    whereQuery[key] = { gt: parseInt(req.body[key].value) };
                                    break;
                                case operators.LESS:
                                    whereQuery[key] = { lt: parseInt(req.body[key].value) };
                                    break;
                                case operators.EQUAL:
                                    whereQuery[key] = parseInt(req.body[key].value);
                                    break;
                                case operators.NOT:
                                    whereQuery[key] = { not: parseInt(req.body[key].value) };
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            switch (req.body[key].operator) {
                                case operators.EQUAL:
                                    whereQuery[key] = req.body[key].value;
                                    break;
                                case operators.CONTAINS:
                                    whereQuery[key] = { contains: req.body[key].value };
                                    break;
                                case operators.NOT:
                                    whereQuery[key] = { not: req.body[key].value };
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                }


                let include = {}

                if (type) {
                    // if (model == "user") {
                    //     include.order = {
                    //         include: {
                    //             device: true
                    //         }
                    //     };
                    // }

                    if (model == "loan") {
                        include.bank_loan_bankTobank = true;
                    }

                }
                if (model == "user") {
                    if (req.user?.Roles.includes("personal") || req.user?.Roles.includes("company")) {
                        whereQuery.id = parseInt(req.user.Id);
                    }
                }

                if (model == "loan") {
                    if (req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id);
                    } else if (req.user?.Roles.includes("company")) {
                        whereQuery.company_id = parseInt(req.user.companyId);
                    } else if (req.user?.Roles.includes("bank")) {
                        whereQuery.bank = parseInt(req.user.bankId);
                    }
                }

                if (model == "personal") {

                    if(req.user?.Roles.includes("company")) {
                        throw new Error("company cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }
                    
                }
                
                if (model == "company") {

                    if(req.user?.Roles.includes("personal")) {
                        throw new Error("Personal users cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }
                    
                }
                
                if (model == "bank") {

                    if(req.user?.Roles.includes("bank")) {
                        whereQuery.id = parseInt(req.user.bankId)
                    }
                    
                }
                
                if (model == "economic") {

                    if(req.user?.Roles.includes("company")) {
                        throw new Error("company cannot access personal economic status!");
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }

                }
                
                if (model == "companyeconomic") {

                    if(req.user?.Roles.includes("personal")) {
                        throw new Error("company cannot access personal economic status!");
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.user_id = parseInt(req.user.companyId)
                    }

                }
                
                if (model == "businessplan") {

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.company_id = parseInt(req.user.companyId)
                    }

                }


                const totalCount = await this.dependencies.databasePrisma[req.params.tableName].findMany({
                    where: whereQuery,
                })
    

                const records = await this.dependencies.databasePrisma[req.params.tableName].findMany({
                    where: whereQuery,
                    include: include,
                    take: parseInt(req.params.PageSize),
                    skip: (parseInt(req.params.PageNumber) - 1) * parseInt(req.params.PageSize)
                })

                
                return res.status(200).json({
                    Items: records,
                    PageNumber: req.params.PageNumber,
                    TotalCount: totalCount.length,
                    PageSize: parseInt(req.params.PageSize)
                });
    
            } catch (error) {
            console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });
        
        this.router.get("/selectbox/:table/:id/:display", AuthService.authenticate, async (req, res, next) => {

            try {

                let model = await prisma.Prisma.ModelName[req.params.table];

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let modelConfiguration = model.charAt(0).toUpperCase() + model.slice(1) + "ScalarFieldEnum";
                let columns = await Object.keys(prisma.Prisma[modelConfiguration])

                if (!columns.includes(req.params.id)) {
                    console.log("column " + req.params.id + " not found in " + req.params.table + " table. available params are:- " + columns.join(", "));
                    throw this.dependencies.exceptionHandling.throwError("column " + req.params.id + " not found in " + req.params.table + " table. available columns are:- " + columns.join(", "), 404);
                }

                if (!columns.includes(req.params.display)) {
                    console.log("column " + req.params.display + " not found in " + req.params.table + " table. available params are:- " + columns.join(", "));
                    throw this.dependencies.exceptionHandling.throwError("column " + req.params.display + " not found in " + req.params.table + " table. available columns are:- " + columns.join(", "), 404);
                }

                let selected = {}
                selected[req.params.id] = true;
                selected[req.params.display] = true;

                const data = await this.dependencies.databasePrisma[req.params.table].findMany({
                    select: selected
                });

                let transformed = data.map(item => {
                    return {
                        "value": item[req.params.id],
                        "label": item[req.params.display]
                    };
                });

                return res.status(200).json(transformed);

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.put("/update", async (req, res, next) => {
            try {

                let { table, data } = req.body;
                // let required
                if (!table || !data) {
                    throw this.dependencies.exceptionHandling.throwError("table and data are required in the request body", 400);
                 }

                let model = await prisma.Prisma.ModelName[table];

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                if(!data.id){
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }

                let record = null;

                if(model == "user" || model == "loan"){
                    console.log("working 1");
                    record = await controllers.getControllers()[table].update(req.user, data);
                }else{
                    let validated = await this.dependencies.routingValidator.validatOnUpdateRecord(model, data);
                    if(validated){
                        let foundRecord = await this.dependencies.databasePrisma[table].findFirst({
                            where: {
                                id: data.id
                            },
                        });
                        if(!foundRecord){
                            console.log("Record to update not found.");
                            throw this.dependencies.exceptionHandling.throwError("Record to update not found.", 404);
                      
                        }

                        if(model == "businessplan"){
                            data = await calculatorBusinessPlan(data, req.user);
                        }
                        if(model == "personal") {
                            data.score = calculatorPersonal(data);
                        }
                        if(model == "economic"){
                            data.score = calculatorEconomic(data);
                        }
                        if(model == "companyeconomic"){
                            data.score = calculatorCompanyEconomic(data);
                        }
                       
                        let cleanData =  getEntities(table, data)
                        
                        record = await this.dependencies.databasePrisma[model].update({
                            where: {
                                id: parseInt(data.id)
                            },
                            data: cleanData,
                        });
                    }
                }

             
                return res.status(200).json({
                    status: 200,
                    data: record
                });

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.put("/changePassword", AuthService.authenticate, async (req, res, next) => {
            try {

                let { data } = req.body;
               
                if (!data) {
                    throw this.dependencies.exceptionHandling.throwError("requestBody must contain data object", 400);
                }

                if (!data.id) {
                   throw this.dependencies.exceptionHandling.throwError("data object must contain 'id' property", 400);
                }
                if (!data.oldPassword) {
                    throw this.dependencies.exceptionHandling.throwError("data object must contain 'oldPassword' property", 400);
                }
                if (!data.newPassword) {
                    throw this.dependencies.exceptionHandling.throwError("data object must contain 'newPassword' property", 400);
                }

                let record = await controllers.getControllers().user.changePassword(req.user, parseInt(data.id), data.oldPassword, data.newPassword);
                if (record) {
                    return res.status(200).json({
                        data: record
                    });
                }

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });


        this.router.delete("/delete", async (req, res, next) => {
            try {
                let { table, data } = req.body;
                   
                if(!data || !table){
                    console.log("request body must have a data and table properties");
                    throw this.dependencies.exceptionHandling.throwError("request body must have a data and table properties", 400);
                }

                if(!data.id){
                    console.log("data property on request body must atleast have an Id");
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }

                let model = await prisma.Prisma.ModelName[table];

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let record = null;

                if(model == "user" || model == "order"){
                    record = await controllers.getControllers()[table].delete(data.id);
                }else{
                    const recordFound = await this.dependencies.databasePrisma[table].findFirst({
                        where: { id: data.id }
                    });
                    if (!recordFound) {
                        throw this.dependencies.exceptionHandling.throwError(model + " with " + data.id + " id does not exist", 404);
                    }

                    record = await this.dependencies.databasePrisma[table].delete({
                        where: { id: data.id }
                    });

                }

                return res.status(200).json({
                    status: 200,
                    message: "record deleted succesfully",
                    data: record
                });

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        return this.router;

    }


}

