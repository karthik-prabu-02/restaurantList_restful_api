import restaurant from '../model/restaurants.js';
import { v4 as uuidv4 } from 'uuid';

export const listRestaurant =async (req , res , next) => {
    let restaurants;
    try {
        restaurants = await restaurant.find();
        // find() in mongodb returns an array which has elements that matches filter
        // if filters not given it returns all of the elements in database schema
    } catch (err) {
        console.log(err);
    }
    if (!restaurants) {
        return res.status(404).json({ message : "No User Found" })
    }
    return res.status(200).json({restaurants});
};
export const addRestaurant =async (req , res , next) =>{
    const {name,cuisine,address,city,rating} = req.body;
    // req.body -> has data from frontend , ex., we send data to db through body of fetch method
    // let existingRestaurant;  ->it is not required ad of for this project 
    // try {
    //     existingRestaurant = await restaurant.find({ _id })
    // } catch (err) {
    //     return console.log(err);
    // }
    // if (!existingRestaurant) {
    //     return res.status(400).json({ message : "User Already Exists!"});
    // }
    const restaurantToAdd = new restaurant({ // creating new user
        id : uuidv4(),
        name,
        cuisine,
        address,
        city,
        rating,
    });
    try {
        await restaurantToAdd.save();
        // it help us to save document in database
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({restaurantToAdd});
};

export const delRest =async (req, res , next) =>{ // it also work with _id
    const {id} = req.params;
    let restaurants;
    try {
        restaurants =await restaurant.findByIdAndDelete(id)
    } catch (err) {
        return res.status(500).json({ message : "Unable To Delete"})
    }
    return res.status(200).json({ message : "Successfully deleted"})
};

export const updateRestaurant = async (req, res, next)=>{  // it works with id
    const  id  = req.params.id;
    
    const {name,cuisine,address,city,rating} = req.body;
    let restaurantToUpdate;
    try {
        const updateFields = {};
        if (name) updateFields.name = name;
        if (cuisine) updateFields.cuisine = cuisine;
        if (rating) updateFields.rating = rating;
        if (address) updateFields.address = address;
        if (city) updateFields.city = city;
        restaurantToUpdate = await restaurant.findByIdAndUpdate(id , updateFields);
        console.log(restaurantToUpdate,"=> data to update");
    } catch (err) {
        return console.log(err);
    }
    if (!restaurantToUpdate) {
        return res.status(500).json({ message : "Unable to ubdate the Resturant"})
    }
    return res.status(200).json({restaurantToUpdate});
    
};

export const selectedRestaurant =async (req ,res , next)=>{
    const id  = req.params.id;           // if we apply concept to login form , use req.body to get email
    // req.body -> has data from frontend , ex., we send data to db through body of fetch method
    let existingRestaurant; 
    try {
        existingRestaurant = await restaurant.findById(id)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!existingRestaurant) {
        return res.status(400).json({ message : "Could not find the Restaurants"});
    }
    return res.status(201).json({existingRestaurant});
};


// if we use find By Then We need to access element throught default id i.e., _id