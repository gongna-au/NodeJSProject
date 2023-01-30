const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create =(req,res)=>{
    // Validate request
    if ((!req.body.uname) ||(!req.body.phone) || (!req.body.password))  {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const user = {
        uname: req.body.uname,
        phone: req.body.phone,
        password: req.body.password
    };

    // Save user in the database
    Users.create(user)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the user."
        })
    });
}

exports.findAll =(req,res)=>{
    const name = req.body.uname;
    condition=name ? {uname: {[Op.like]:`%${name}%`}}:null;
    Users.findAll({
        where:condition,
    })
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(400).send({
            message:err.message || "Some error occurred while findAll the user."
        })
    })
}

exports.findOne=(req,res)=>{
    if (!req.params.id){
        res.status(300).send({
            message:"user id is empty"
        })
    }
    const id =req.params.id;
    Users.findByPk(id)
    .then(data=>{
        if (data){
            res.send(data);
            return;
        }else{
            res.status(404).send({
                message: `Cannot find Tutorial with id=${id}.`
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Error retrieving user with id=" + id
        })
    })
}

exports.delete=(req,res)=>{
    const id =req.params.id;
    Users.destroy({
        where: { id: id }
    })
    .then(num=>{
        if (num==1){
            res.send({message:"User was deleted successfully!"});
            return;
        }else{
            res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });s
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Error delete user with id=" + id
        })
    })
}

exports.deleteAll=(req,res)=>{
    Users.destroy({
        where:{},
    })
    .then(nums=>{
        res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
    })
}

exports.update=(req,res)=>{
    const id = req.params.id;
    Users.update(req.body,{
        where:{
            id:id
        }
    })
    .then(num=>{
        if (num == 1) {
            res.send({
              message: "Users was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
          }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating User with id=" + id
          });
    })
}

exports.issueToken=(req,res)=>{

}

