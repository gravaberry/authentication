import { where } from "sequelize";
import User from "../models/UserModel.js"
import  argon2  from "argon2";




export  const getUsers = async (req, res) =>{
    try {
        const response = await User.findAll({
            attributes:[ 'uuid','name','email','password','role']
    });
        res.status(200).json(response);
    } catch (error) {
            res.status(500).json({msg: error.message});    }
}

export  const getUsersByID = async (req, res) =>{
    try {
        const response = await User.findOne({
            attributes:[ 'uuid','name','email','role'],
            where:{
                uuid: req.params.id
           }
        });
       
       res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// export  const createUser = async (req, res) =>{
//     const {name,email, password, confpassword, role} = req.body;
//     if(password !== confpassword) return res.status(400).json({msg:"Pasword dan confirm password tidak cocok!"});
//     const hashPassword = await argon2.hash(password);
//     try {
//         await User.create({
//             name:name,
//             email:email,
//             password:hashPassword,
//             role:role
//          });
//         res.status(201).json({msg:"Register success!"});
//     } catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }


export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export  const updateUsers = async (req, res) =>{
    const user = await User.findOne({
        where:{
            uuid:req.params.id
        }
    })
    if(!user) return res.status(404).json({msg:"User not found"});
    const {name, email, password,confpassword, role} = req.body;
    let hashPassword;
    if(password == "" || password ===  null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }

    if(password !== confpassword) return res.status(404).json({msg:"password tidak cocok"});
    try {
        await User.update({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        },{
            where:{
                id:user.id
            }
        })
        res.status(200).json({msg:"User updated"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}
export  const deleteUser = async (req, res) =>{
    const user = await User.findOne({
        where:{
            uuid:req.params.id
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"});
    try {
        await User.destroy({
            where :{
                uuid:req.params.id
            }
        })

        res.status(200).json({msg:" Data Berhasil di Hapus"});
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}