import { json } from "express";
import {Post} from "../model/post.model.js";




const createPost = async (req, res)=>{
    const {title, body}= req.body;
    try {
            const post= await Post.create({
                title,
                body,
                author:req.user.id
            });
            res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return res.status(200).json(posts); // single response, plain array
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updatePost =async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: 'Post not found'});

        if (post.author.toString()!== req.user.id){
            return res.status (403).json({message:'Not authorized'});

        }
        const updated= await Post.findByIdAndUpdate(req.params.id, req.body,{
            new:true, runValidators:true,
        });
        res.json(updated);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deletePost = async (req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message:'User not found'})

        if(post.author.toString() !== req.user.id){
            return res.status(403).json({message:'Not authorized'})
        }

    await Post.findByIdAndDelete(req.params.id);
    res.json({message:'Post deleted'})

    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}




export{createPost,getPost,updatePost,deletePost};