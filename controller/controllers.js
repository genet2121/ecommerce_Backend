


const AuthController = require("./auth/auth");
const BankController = require("./bank/bank");
const BusinessPlanController = require("./businessPlan/businessPlan");
const CompanyController = require("./company/company");
const CompanyEconomicController = require("./companyEconomic/companyEconomic");
const EconomicController = require("./economic/economic");
const LoanController = require("./loan/loan");
const PersonalController = require("./personal/personal");
const UserController = require("./user/user");

const AttchmentController = require("./attachment/attachment");


module.exports = class Controller{

    dependencies;
    
    constructor(deps){
        this.dependencies = deps;
    };

    

    getControllers(){
        try{
            return {
                user: new UserController(this.dependencies),
                bank: new BankController(this.dependencies),
                businessPlan: new BusinessPlanController(this.dependencies),
                company: new CompanyController(this.dependencies),
                companyEconomic: new CompanyEconomicController(this.dependencies),
                economic: new EconomicController(this.dependencies),
                loan: new LoanController(this.dependencies),
                personal: new PersonalController(this.dependencies),
                auth: new AuthController(this.dependencies),
                attachment: new AttchmentController(this.dependencies),
            };

        }catch(error){
            console.log(error);
        }
    }

};
