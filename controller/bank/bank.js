
module.exports = class BankController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async get(requestUser, id) {
        try {
            const bank = await this.dependencies.databasePrisma.bank.findMany({
                where: {
                    id: Number(id)
                }
            })

            if(!bank.length){
                throw new Error("no bank available with the specified id " + id);
            }  
             return bank;
        }
        catch (error) {
            throw new Error(error.message);
      }
    }

    async gets(requestUser, id) {
        try {
            return await this.dependencies.database.bank.findMany();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async create(requestUser, data) {
        try {

            if(requestUser){         
                const bank = await this.dependencies.databasePrisma.bank.create({
                    data: data
                })
                return bank;
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
                const bank = await this.dependencies.databasePrisma.bank.update({
                    where: {
                        id: data.id
                    },
                    data: data,
                });
                return bank
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
                const bank = await this.dependencies.databasePrisma.bank.delete({
                    where: { id: data.id }
                });
                return bank;
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