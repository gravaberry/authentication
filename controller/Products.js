import { Op } from "sequelize";
import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";

export  const getProducts = async (req, res) =>{
    try {
        let response;
        if(req.role == "admin"){
           response = await Products.findAll({
            attributes:['uuid',"name","price"],
            include:[{
                model:Users,
                attributes:['name','email']
            }]
           }) 
        }else{
            response = await Products.findAll({
                attributes:['uuid',"name","price"],
                where:{
                    userId:req.userId
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
               }) 
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

export  const getProductsByID = async (req, res) =>{
    try {
        const product = await Products.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!product) return res.status(404).json({msg:"Product not found"});
        let response;
        if(req.role === "admin"){
            response = await Products.findOne({
                attributes:['uuid','name','price'],
                where:{
                    id:product.id
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            })
        }else{
            response = await Products.findOne({
                attributes:['uuid','name','price'],
                where:{
                    [Op.and]:[{id:Products.id},{userId:req.userId}]
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}
export  const createProduct = async (req, res) =>{
    const {name, price} = req.body;
    try {
        await Products.create({
            name:name,
            price:price,
            userId:req.userId
        })

        res.status(201).json({msg:"Product created successfully"});
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}
export  const updateProducts = async (req, res) =>{
    try {
        const product = await Products.findOne({
            uuid:req.params.id
        });
        if(!product) return res.status(404).json({msg:"Product not found"});
        const {name,price} = req.body;

        if(req.role == "admin"){
            await Products.update({
                name,price
            },{
                where:{
                    id:product.id
                }
            })
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg:" Akses Terlarang"});
            await Products.update({
                name,price
            },{
                where:{
                    [Op.and]:[{id:product.id},{userId:req.userId}]
                }
            })
        }
        res.status(200).json({msg:" Product Berhasil diUpdate"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}
export  const deleteProduct = async (req, res) =>{
    try {
        const product = await Products.findOne({
            uuid:req.params.id
        });
        if(!product) return res.status(404).json({msg:"Product not found"});
        const {name,price} = req.body;

        if(req.role == "admin"){
            await Products.destroy({
                where:{
                    id:product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg:" Akses Terlarang"});
            await Products.destroy({
                where:{
                    [Op.and]:[{id:product.id},{userId:req.userId}]
                }
            })
        }
        res.status(200).json({msg:" Product Berhasil Hapus"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}