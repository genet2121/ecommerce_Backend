


export default class GetUserUseCase{

    databaseService;

    constructor(deps){
        this.databaseService = deps;
    }

    async execute(requestQuery){
            if(requestQuery.id){
                return this.databaseService.getById(requestQuery.id);    
            }
            if(requestQuery.email){
                return this.databaseService.getByEmail(requestQuery.email);
            }
            return this.databaseService.getAll();
    }

}