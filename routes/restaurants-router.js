import express from "express";

import { listRestaurant , addRestaurant , selectedRestaurant ,updateRestaurant , delRest} from "../controller/restaurants-controller.js";
const router = express.Router();



// all the router here has ('/') 
router.get('/' , listRestaurant);


router.post('/' , addRestaurant);


router.get('/:id' , selectedRestaurant)

router.delete('/:id' , delRest) // it works with _id

router.patch('/:id' , updateRestaurant) // it works with _id


export default router;