
module.exports = class FaqController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }


    async getFaq(requestUser, id) {
        try {
            const faq = await this.dependencies.databasePrisma.faq.findMany({
                where: {
                    id: Number(id)
                }
            })

            if(!faq.length){
                throw new Error("no faq found with the id " + id);
            }  
            return faq;
        }
        catch (error) {
            throw new Error(error.message);
      }
    }

    async getfaqs(requestUser, id) {
        try {
            return await this.dependencies.database.faq.findMany();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async create(requestUser, data) {
        try {

            if(requestUser){
                const faq = await this.dependencies.databasePrisma.faq.create({
                    data: data
                })
                return faq;
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
                const faq = await this.dependencies.databasePrisma.faq.update({
                    where: {
                        id: data.id
                    },
                    data: data,
                });
                return faq;
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
                const faq = await this.dependencies.databasePrisma.faq.delete({
                    where: { id: data.id }
                });
                return faq;
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