var express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const { v4: uuidv4 }  = require("uuid") ;
const Boutique = require("../../models/boutiqueModel").model;

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const placeOrders = asyncHandler(async (req, res) => {
       
     const {token,subtotal, currentUser, cartItems} = req.body
     
     

     if (isNaN(subtotal)) {
       // Handle the error for an invalid subtotal value
       return res.status(400).json({ error: "Invalid subtotal value" });
     }
     
     try {
       const customer = await stripe.customers.create({
         email: token.email,
         source: token.id,
       });
     
       const payment = await stripe.charges.create(
         {
           amount: subtotal * 100,
           currency: 'usd',
           customer: customer.id,
           receipt_email: token.email,
         },
         {
           idempotencyKey: uuidv4(),
         }
       );
     
      
     
               
           
            if(payment)
            {
                const neworder = new Order({
                    name: currentUser.name,
                    email: currentUser.email,
                    userid: currentUser._id,
                    orderItems : cartItems,
                    orderAmount: subtotal,
                    shippingAddress : {
                        street : token.card.address_line1,
                        city:    token.card.address_city,
                        country: token.card.address_country,
                        pincode: token.card.address_zip,
                     },
                     transactionId: payment.source.id
                })
                       neworder.save()
                       
                       res.send('Order placed successfully')
            }
                  else
                  {
                      res.send('Payment failed')
                  } 

                }
                catch(error)
                {
                       return res.status(400).json({ 
                        message : 'Something went wrong' + 
                        error
                      }
                        )
                }
        
        
        


});

const getUserOrders = asyncHandler(async (req, res) => {
      const {userid}  = req.body
      try
      {
        const orders = await Order.find(
          {
            userid: userid
          }).sort({_id : -1})
        res.send(orders)
      }
          
       catch(error) 
      {
        return res.status(400).json({ 
          message : 
          'Something went wrong'
        })


        
      }
})

const getAllOrders = asyncHandler(async (req, res) => {
  try
  {
    const orders = await Order.find({})
      
    res.send(orders)
  }
      
   catch(error) 
  {
    return res.status(400).json({ 
      message : 
      'Something went wrong'
    })
 }
})

const deliverOrders = asyncHandler(async (req, res) => {
  const orderid = req.body.orderid

  try
  {
      const order = await Order.findOne({_id: orderid})
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Assuming the request body contains a 'status' field
      order.status = req.body.status;
  
      const updatedOrder = await order.save();
  
      res.json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

})



const getMostRequestedBoutique = asyncHandler(async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$orderItems" },

      {
        $group: {
          _id: "$orderItems.boutiqueId",
          total: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { total: -1 } },
    ]);
    if (!result) {
      res.status(404).json({ message: "No boutique item found" });
    }
    const boutiqueItem = await Boutique.findById(result[0]._id);
    res.status(200).json(boutiqueItem);
  } catch (err) {}
});
module.exports = {
  placeOrders,
  getUserOrders,
  getAllOrders,
  deliverOrders,
  getMostRequestedBoutique
}



