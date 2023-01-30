module.exports=(sequelize,Sequelize)=>{
   const user= sequelize.define("user",{
        uname :{
            type :Sequelize.STRING
        },
        phone:{
            type:Sequelize.STRING
        },
        password:{
            type :Sequelize.STRING
        },
    });
    return user;
}