
module.exports = class CompanyEconomicController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async getCompanyEconomic(id) {
        try {
            const companyeconomic = await this.dependencies.databasePrisma.companyeconomic.findMany({
                where: {
                    id: Number(id)
                }
            })

            if(!companyeconomic.length){
                throw new Error("no companyeconomic found with the id " + id);
            }  
             return companyeconomic;
        }
        catch (error) {
            throw new Error(error.message);
      }
    }

    async getCompanyeconomics() {
        try {
            return await this.dependencies.database.companyeconomic.findMany();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async create(requestUser, data) {
        try {

            if(requestUser){
                const companyeconomic = await this.dependencies.databasePrisma.companyeconomic.create({
                    data: data
                })
                return companyeconomic;
            }else{
                throw new Error("unAuthorized access")
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
       }

    }


    async update(requestUser, data) {
        try {

            if(requestUser.role == "admin"){
                const companyeconomic = await this.dependencies.databasePrisma.companyeconomic.update({
                    where: {
                        id: data.id
                    },
                    data: data,
                });
                return companyeconomic;
            }
            else{
                throw new Error("unAuthorized access")
            }
            
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async delete(requestUser, data) {

        try {
            if(requestUser.role == "admin"){
                const companyeconomic = await this.dependencies.databasePrisma.companyeconomic.delete({
                    where: { id: data.id }
                });
                return companyeconomic;
            }else{
                throw new Error("unAuthorized access")
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
       }
    }


}