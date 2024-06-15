


const BankEntity = require("./bank");
const BusinessPlanEntity = require("./businessPlan");
const CompanyEntity = require("./company");
const CompanyEconomicEntity = require("./companyEconomic");
const EconomicEntity = require("./economic");
const LoanEntity = require("./loan");
const PersonalEntity = require("./personal");
const UserEntity = require("./user");
const AttachmentEntity = require("./attachment");
const Product = require("./product");


module.exports = (name, data) => {
    try{

        if(name == "bank"){
            const bankData = new BankEntity(data);
            return bankData;
        }
        if(name == "businessplan"){
            const businessPlanData = new BusinessPlanEntity(data);
            return businessPlanData;
        }
        if(name == "company"){
            const companyData = new CompanyEntity(data);
            return companyData;
        }
        if(name == "companyeconomic"){
            const companyEconomicData = new CompanyEconomicEntity(data);
            return companyEconomicData;
        }
        if(name == "economic"){
            const economicData = new EconomicEntity(data);
            return economicData;
        }
        if(name == "loan"){
            const loanData = new LoanEntity(data);
            return loanData;
        }        
        if(name == "personal"){
            const personalData = new PersonalEntity(data);
            return personalData;
        }
        if(name == "user"){
            const userData = new UserEntity(data);
            return userData;
        }
        if(name == "attachment"){
            const attachmentData = new AttachmentEntity(data);
            return attachmentData;
        }
        if(name == "product"){
            return new Product(data);
        }

    }catch(error){
        console.log(error);
        throw new Error(error.message, 500);
    }
}