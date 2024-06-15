
module.exports = class BusinessPlanController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async get(id) {
        try {
            const businessplan = await this.dependencies.databasePrisma.businessplan.findMany({
                where: {
                    id: Number(id)
                }
            })

            if(!businessplan.length){
                throw new this.dependencies.exceptionHandling("user0001");
            }  
             return businessplan
        }
        catch (err) {
            if (err instanceof this.dependencies.exceptionHandling) {
                throw err;
            } else {
                throw new this.dependencies.exceptionHandling("db0001");
            }
      }
    }

    async gets() {
        try {
            return await this.dependencies.database.businessplan.findMany();
        }
        catch (err) {
            throw new this.dependencies.exception("db0001");
        }
    }

    async create(data) {
        try {

            const businessplan = await this.dependencies.databasePrisma.businessplan.create({
                data: data
            })
            return businessplan;
        }
        catch (err) {
            console.log(err);
            if (err instanceof this.dependencies.exception) {
                throw err;
            } else {
                throw new this.dependencies.exception("db0001");
            }
        }

    }

    async update(id, input) {
        try {

            return await this.dependencies.databasePrisma.businessplan.update({
                where: {
                    id
                },
                data: input,
            });

        } catch (err) {
            throw this.dependencies.exception("db0001");
        }
    }

    
    async delete(id) {

        try {

        await this.dependencies.databasePrisma.businessplan.delete({
            where: { id: id }
        });

        }
        catch (err) {
                throw err
        }

    }


}