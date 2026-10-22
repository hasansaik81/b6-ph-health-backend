
// T =model type 
export class QueryBilder<
T,
TWherrInput=Record<string,unknown>,
TInclude=Record<string,unknown>
>{
    private query:prismaFindManyArgs;
    private countQuery:PrsmaCountArgs;
}