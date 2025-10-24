const Cart = require('../models/cartModel')

const Menu = require('../models/menuModel')


    //ADD ITEMS TO CART

    const addItemToCart = async(req,res)=>
    {
        try 
        {
            //get logged-in user ID from authUser middleware
            const userId = req.user.id

            //get item details by request body
            const{itemId,quantity}=req.body

            //check for validation
            if(!itemId || !quantity)
            {
                return res.status(400).json({message:"Menu Item ID and quantity Required"})
            }

              //Fetch menu item first to get price
             const item = await Menu.findById(itemId)
             if (!item) 
                {
            return res.status(404).json({ message: "Menu Item not found" });
                }

            

            //check if the user already has a cart
            let cart = await Cart.findOne({userId})

            // if no cart exists , create new cart

            if(!cart)
           {
         cart = new Cart({ userId, items: []})
        
           }


            

                // checks whether the item the user is trying to add already exists in the cart
                const existingItem = cart.items.find(element => element.itemId.toString() ==itemId);

                //if item exists increase the quantity
                if(existingItem)
                {
                    existingItem.quantity = existingItem.quantity + quantity
                }
                else{
                    //if item not exists add new item
                    cart.items.push({itemId,quantity})

                }

               
             
                // Recalculate total amount , price also storing in menu
                
                cart.calculateTotal()
                 // Save cart
                 await cart.save()

                 return res.status(200).json({message:"Item added to the Cart Successfully !!!",cart})

            }
            
         
        catch (error) 
        {
          console.log(error)
        res.status(500).json({ error: "Internal Server Error" })     
        }
    }


  //GET CURRENT USER'S CART
  
    const getCart = async(req,res) =>
    {
      try
       {
  
    // Get user ID from authUser middleware
    const userId = req.user.id;
  
    // Find cart for the logged-in user
    const cart = await Cart.findOne({ userId }).populate("items.itemId") //replaces each menuItemId with the full item details(item and quantity)

    //if cart is empty or no cart 
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
     

      // Recalculate total using the model method
         await cart.calculateTotal();
         await cart.save(); 

         
      //send response
        res.status(200).json({message: "User cart fetched successfully",cart})
          
      }
      catch (error)
       {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
      }
    }



//UPDATE CURRENT CART(QUANTITY UPDATE HERE)
const updateCart = async(req,res) =>
{
    try 
    {

         //get logged-in user ID from authUser middleware
            const userId = req.user.id

           // extract details from request body
            const {quantity } = req.body;
            const{itemId}=req.params


            //check for validation
            if(!quantity)
            {
                return res.status(400).json({message:"Quantity is  Required"})
            }

              //Fetch menu to check items present there
             const menu = await Menu.findById(itemId)
             if (!menu) 
                {
            return res.status(404).json({ message: "Items not found" });
                }

            

            //check if the user already has a cart
            const cart = await Cart.findOne({userId})

            // if no cart exists , create new cart

            if(!cart)
           {
         cart = new Cart({ userId, items: []})
         return res.status(404).json({ message: "Cart not found for this User" });
        
           }


            

                // if cart exists checks whether the item the user is trying to add already exists in the cart
                const existingItem = cart.items.find(element => element.itemId.toString() ==itemId);

                //if item exists increase the quantity
                if(!existingItem)
                {
                    return res.status(404).json({ message: "Item not found in this Cart" });
                }

                //check validation
                
                // If quantity is 0 or less, remove item from cart
                if (quantity <= 0) 
                    {
                cart.items = cart.items.filter(element => element.itemId.toString() !== itemId);
                    } 
                else
                     {
                // Update quantity
                existingItem.quantity = quantity;
    }
             
                // Recalculate total amount , price also storing in menu
                
                cart.calculateTotal()
                 // Save cart
                 await cart.save()

                 return res.status(200).json({message:" Cart Details Updated Successfully !!!",cart})
      
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
        
    }
}



// DELETE A CART ITEM
const deleteItemFromCart = async(req,res)=>
    {
        try

         {

            //get logged-in user ID from authUser middleware
            const userId = req.user.id

            //get item details by request parameters
            const{itemId}=req.params

            //check for validation
            if(!itemId)
            {
                return res.status(400).json({message:"Item ID is Required"})
            }

         

            //check if the user already has a cart
            let cart = await Cart.findOne({userId})

         
            if(!cart)
           {
        
         return res.status(404).json({ message: "Cart not found for this User" });
        
           }

           // if cart is present ,check if item exists in the cart

          const itemExists = cart.items.some(element => element.itemId.toString() === itemId);
          if (!itemExists) 
            {
           return res.status(404).json({ message: "Item not found in cart" });
        }

          // Remove item from cart
          cart.items = cart.items.filter(element => element.itemId.toString() !== itemId)

        

          // Recalculate total
          cart.calculateTotal();

          // Save updated cart
          await cart.save();

          return res.status(200).json({ message: "Item Successfully removed from cart !!", cart });


     
            
         } 
        catch (error)
         {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })      
        }
    }




    

    //CLEAR ALL ITEMS FROM CART
    const clearCart = async(req,res)=>
    {
        try 
        {

        //fetch logged in user's id from authUser middleware
        const userId = req.user.id

        

        // find the user's cart if any using user ID

        let cart = await Cart.findOne({userId})

        if(!cart)
        {
            return res.status(404).json({error:"No Cart Found"})


        }


        // Check if the cart is already empty
        if (cart.items.length === 0) 
            {
           return res.status(200).json({ message: "Cart is already empty" });
            }
            
      // Remove all items and reset total amount

      cart.items =[]
      cart.totalAmount=0

      // save changes in cart
      await cart.save()
            res.status(200).json({message:"Cart Items Cleared Successfully!!!"})
        } 
        catch (error)
         {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
            
        }
    }

   

module.exports = {getCart,addItemToCart,updateCart,deleteItemFromCart,clearCart }