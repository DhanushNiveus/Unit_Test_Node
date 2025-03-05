# Unit_Test_Node

Create a node Express server.
npm install express

Connect to mongo DB.
npm install mongodb
npm install mongoose dotenv morgan

Create API to create users, update a user and get list of users.

#sever.js

app.post("/users", async (req, res) => {
try {
const newUser = new User(req.body);
await newUser.save();
res.status(201).json(newUser);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
![alt text](image-2.png)

// Get all users (GET)
app.get("/users", async (req, res) => {
try {
const users = await User.find();
res.json(users);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
![alt text](image.png)

// Update a user (PUT)
app.put("/users/:id", async (req, res) => {
try {
const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
new: true,
});
res.json(updatedUser);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
![alt text](image-1.png)

Add proper logs Write unit tests to test your code.

npm test

![alt text](image-3.png)

#MongoDb Cluster
![alt text](image-4.png)

//add .env file

MONGO_URI=mongodb+srv://dbAdmin:dbAdminNiveus@cluster0.mgjpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
