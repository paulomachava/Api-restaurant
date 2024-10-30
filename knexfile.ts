export default{
    client:"sqlite3",
    connection:{
        filename:"./src/database/database.db",
    },

    //garantir que seja respeitada a relacao entre tabelas
    pool:{
        afterCreate:(connection:any, done:any)=>{
            connection.run("PRAGMA foreign_key =ON")
            done()
        }
    },
    useNullAsDefault:true,
    migrations:{
        extensions:"ts",
        directory:"./src/database/migrations"
    },
    seeds:{
        extensions:"ts",
        directory:"./src/database/seeds"
    }
}