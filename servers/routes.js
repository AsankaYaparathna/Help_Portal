const express = require("express");
const userModel = require("./model/userModel");
const postModel = require("./model/postModel");
const { post } = require("jquery");

const app = express();

const stripe = require("stripe")("sk_test_51JbsYvEuUC9aV6lbnyxqZVyLbMkvbRf4EpD8wTubOjSNaDcLIHVPquyJiXIeWkPnMGnHhiyFtNrK9zEW8CXpp4Ub00o75nJF8T");


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


async function UserAvailabilityCheck(email) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email);
  for (let x in findUser) {
    if (findUser[x]) {
      return true;
    }
  }
  return false;
}

async function UserLoginCheck(email, password) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email && x.password == password);
  for (let x in findUser) {
    if (findUser[x]) {
      return true;
    }
  }
  return false;
}

async function GetUser(email) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email);
  for (let x in user) {
    if (user[x].email == email) {
      return user[x];
    }
  }
}

async function GetPost(userId) {
  const post = await postModel.find({});
  var pt =Array;
  var i =0;
  for (let x in post) {
    if (post[x].userId == userId) {
      pt[i]=(post[x]);
      i++;
    }
  }

  return pt;
}


//User - API End Point

app.post("/user/create", async (request, response) => {
  const user = new userModel(request.body);
  try {
    if (await UserAvailabilityCheck(user.email)) {
      var re = {
        "status": false,
        "message": "Failed - This User already exists",
        "data": user
      };
      console.log(re);
      response.send(re);
    }
    else {
      await user.save();
      var re = {
        "status": true,
        "message": "Successfully",
        "data": user
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/user/getAll", async (request, response) => {
  const user = await userModel.find({});
  //response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": user
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/user/update", async (request, response) => {
  const user = await userModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await user.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": user
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/user/userLogin", async (request, response) => {
  try {
    if (await UserLoginCheck(request.body.email, request.body.password)) {
      var re = {
        "status": true,
        "message": "Successfully",
        "data": request.body.email
      };
      console.log(re);
      response.send(re);
    }
    else {
      var re = {
        "status": false,
        "message": "Falid - email or password incorrect",
        "data": request.body.email
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/user/getUser", async (request, response) => {
  try {
    var user = await GetUser(request.body.email);
    if (user) {
      var re = {
        "status": true,
        "message": "Successfully",
        "data": user
      };
      console.log(re);
      response.send(re);
    }
    else {
      var re = {
        "status": false,
        "message": "Falid - email or password incorrect",
        "data": request.body.email
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.delete("/user/delete/:id", async (request, response) => {
  const post = await userModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": post
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

//Post - API End Point
//post check
async function UserAvailabilityCheck(email) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email);
  for (let x in findUser) {
    if (findUser[x]) {
      return true;
    }
  }
  return false;
}
app.post("/post/create", async (request, response) => {
  const post = new postModel(request.body);
  try {
    await post.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": post
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/post/getAll", async (request, response) => {
  const post = await postModel.find({});
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": post
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/post/update", async (request, response) => {
  const post = await postModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await post.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": post
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


app.post("/post/getPost", async (request, response) => {
  try {
    var post = await GetPost(request.body.userId);
    if (post) {
      var re = {
        "status": true,
        "message": "Successfully",
        "data": JSON.parse(JSON.stringify(post))
      };
      console.log(re);
      response.send(re);
    }
    else {
      var re = {
        "status": false,
        "message": "Falid - email or password incorrect",
        "data": request.body.userId
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/post/checkout", async (req, res, next) => {
  try {
    var post =req.body['items'];
      const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
      {
          shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
              amount: 0,
              currency: 'usd',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
              minimum: {
              unit: 'business_day',
              value: 5,
              },
              maximum: {
              unit: 'business_day',
              value: 7,
              },
          }
          }
      },
      {
          shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
              amount: 1500,
              currency: 'usd',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
              minimum: {
              unit: 'business_day',
              value: 1,
              },
              maximum: {
              unit: 'business_day',
              value: 1,
              },
          }
          }
      },
      ],
      line_items: {
          price_data: {
            currency: 'usd',
            product_data: {
              name: post.title,
              images: [post.images]
            },
            unit_amount: 10,
          },
          quantity: 1,
        },
         mode: "payment",
         success_url: "http://localhost:4242/success.html",
         cancel_url: "http://localhost:4242/cancel.html",
      });

      res.status(200).json(session);
  } catch (error) {
      next(error);
  }
});

app.delete("/post/delete/:id", async (request, response) => {
  const post = await postModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": post
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});



module.exports = app;


// app.delete("/user/delete/", async (request, response) => {
//   const user = await userModel.findByIdAndDelete(request.body.id);
//   try {
//     await user.save();
//     var re = {
//       "status": true,
//       "message": "Successfully",
//       "data": user
//     };
//     console.log(re);
//     response.send(re);
//   } catch (error) {
//     response.status(500).send(error);
//     console.log(error);
//   }
// });

// app.delete("/post/delete/", async (request, response) => {
//   const post = await postModel.findByIdAndDelete(request.body.id);
//   try {
//     await post.save();
//     var re = {
//       "status": true,
//       "message": "Successfully",
//       "data": post
//     };
//     console.log(re);
//     response.send(re);
//   } catch (error) {
//     response.status(500).send(error);
//     console.log(error);
//   }
// });