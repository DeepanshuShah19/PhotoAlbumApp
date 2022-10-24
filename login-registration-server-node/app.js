const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://Aliasgar:Palgharwala@cluster0.fcncn6y.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password: encryptedPassword,
      taskCount:0
    });
    const token = jwt.sign({ email: email }, JWT_SECRET)
    res.send({ status: "ok", data: token });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/addTask", async (req, res) => {
  console.log(req.body);

  const { task_name, task_description, story_points, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);
      const tc = await User.findOne({email: user.email});
      const tCount=tc.taskCount+1;
      await User.updateOne(
          { "email": user.email},
          { "$push": 
              {"tasks": 
                  {
                    "task_name": task_name,
                    "task_description": task_description,
                    "task_status": "Active",
                    "story_points": story_points,
                    "task_id":+tCount
                  }
              }
          }
      )
      await User.updateOne(
          { "email": user.email},
          { "$set": 
              {
                "taskCount":+tCount
              }
          }
      )
    res.send({ status: "ok", data: task_name });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});

app.post("/viewTask", async (req, res) => {
  console.log(req.body);

  const { task_id, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);
      const task = await User.aggregate([
      {
        $match: {
          "email": user.email
        }
      },
      {
        $unwind: '$tasks'
      },
      {
        $match: {
          'tasks.task_id': task_id
        }
      },
      {
        "$project": {
            "tasks":1,
            _id:0
        }
      }
    ])
    res.send({ status: "ok", data: task[0].tasks });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});


app.post("/searchTask", async (req, res) => {
  console.log(req.body);

  const { task_name, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);
      const findTasks = await User.aggregate([
        {
          $match: {
            "email": user.email
          }
        },
        {
          $unwind: '$tasks'
        },
        {
        $match: {
            'tasks.task_name': {$regex: task_name}
          }
        },
        {
          "$project": {
              "tasks":1,
              _id:0
          }
        }
      ])

      console.log("allTasks########", findTasks);

    const respTasks = [];
    for (var i = 0; i < findTasks.length; i++) {
      findTasks[i] = findTasks[i].tasks;
    }

    res.send({ status: "ok", data: {"tasks":findTasks, "taskCount":findTasks.length} });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});


app.post("/getTasks", async (req, res) => {
  console.log(req.body);

  const { token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);
      
      const allTasks = await User.aggregate([
        {
          $match: {
            "email": user.email
          }
        },
        {
          $unwind: '$tasks'
        },
        {
          "$project": {
              "tasks":1,
              _id:0
          }
        }
      ])

      const completedTasks = await User.aggregate([
        {
          $match: {
            "email": user.email
          }
        },
        {
          $unwind: '$tasks'
        },
        {
          $match: {
            'tasks.task_status': "Complete"
          }
        },
        {
          "$project": {
              "tasks":1,
              _id:0
          }
        }
      ])

      const activeTasks = await User.aggregate([
        {
          $match: {
            "email": user.email
          }
        },
        {
          $unwind: '$tasks'
        },
        {
          $match: {
            'tasks.task_status': "Active"
          }
        },
        {
          "$project": {
              "tasks":1,
              _id:0
          }
        }
      ])

      for (var i = 0; i < allTasks.length; i++) {
        allTasks[i] = allTasks[i].tasks;
      }
      
      for (var i = 0; i < completedTasks.length; i++) {
        completedTasks[i] = completedTasks[i].tasks;
      }
      
      for (var i = 0; i < activeTasks.length; i++) {
        activeTasks[i] = activeTasks[i].tasks;
      }

    res.send({ status: "ok", data: {"allTasks":allTasks, "allTaskCount":allTasks.length,"completedTasks":completedTasks, "completedTasksCount":completedTasks.length,"activeTasks":activeTasks, "activeTasksCount":activeTasks.length} });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});



app.post("/editTask", async (req, res) => {
  console.log(req.body);

  const { task_id, task_name, task_description, story_points, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);

      await User.updateMany(
        {
          "email": user.email,
          "tasks.task_id":+task_id
        },
        {
          $set:{
              "tasks.$.task_name": task_name,
              "tasks.$.task_description": task_description,
              "tasks.$.story_points": story_points
          }
        })

      res.send({ status: "ok", data: task_name });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});

app.post("/deleteAllTasks", async (req, res) => {
  console.log(req.body);

  const { token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);

      await User.updateMany(
        {
          "email": user.email
        },
        {
          $set:{
              "tasks": [],
              "taskCount":0
          }
        })

      res.send({ status: "ok", data: "success" });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});

app.post("/completeTask", async (req, res) => {
  console.log(req.body);

  const { task_id, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);

      await User.updateMany(
        {
          "email": user.email,
          "tasks.task_id":+task_id
        },
        {
          $set:{
              "tasks.$.task_status": "Complete",
          }
        })

      res.send({ status: "ok", data: task_id });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});

app.post("/activeTask", async (req, res) => {
  console.log(req.body);

  const { task_id, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);

      await User.updateMany(
        {
          "email": user.email,
          "tasks.task_id":+task_id
        },
        {
          $set:{
              "tasks.$.task_status": "Active",
          }
        })

      res.send({ status: "ok", data: task_id });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});


app.post("/deleteTask", async (req, res) => {
  console.log(req.body);

  const { task_id, token } = req.body;
  try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user);

  const allTasks = await User.aggregate([
    {
      $match: {
        "email": user.email
      }
    },
    {
      $unwind: '$tasks'
    },
    {
      "$project": {
          "tasks":1,
          _id:0
      }
    }
  ])

  const newArr = [];
  var j=0;
  for (var i = 0; i < allTasks.length; i++) {
    if(allTasks[i].tasks.task_id != task_id){
      newArr[j] = allTasks[i].tasks;
      j++;
    }
    
  }

  await User.updateMany(
    {
      "email": user.email
    },
    {
      $set:{
          "tasks": newArr
      }
    })
      res.send({ status: "ok", data: +task_id });
  } catch (error) {
    console.log("####################", error);
    res.send({ status: "error", data: error });
  }
});

app.post("/edit-details", async (req, res) => {
  console.log(req.body);
  const { name, email, password, bio, phoneNumber } = req.body;

  try {

    await User.updateOne({
      "email": email
    },
    {
      $set: {
        email,
        name,
        bio,
        phoneNumber,
        password
      }
    })

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/google-login", async (req, res) => {

  const email = req.body.userDetails.email;

  const user = await User.findOne({ email });
  if (!user) {
    const name = req.body.userDetails.given_name + " " + req.body.userDetails.family_name;
    const password = req.body.userDetails.given_name + ":" + req.body.userDetails.family_name;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: encryptedPassword,
      taskCount:0
    });
  }

  const token = jwt.sign({ email: email }, JWT_SECRET);

  if (res.status(201)) {
    return res.json({ status: "ok", data: token });
  } else {
    return res.json({ error: "error" });
  }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.listen(12230, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:12230/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
