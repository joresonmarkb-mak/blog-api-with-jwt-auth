import {Router} from "express";
import{createPost, deletePost, getPost, updatePost}from "../controllers/post.controller.js"
import protect from "../middleware/auth.js";


const router = Router();


router.route('/createPost').post( protect,createPost);
router.route('/getPost').get(getPost);
router.route('/updatePost/:id').patch(protect,updatePost);
router.route('/deletePost/:id').delete(protect,deletePost);


export default router;