import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const users = [
    {
        "id": "54f1f25a-56fd-4a10-944c-c23367fcd179",
        "lastName": "Cespedes",
        "firstName": "Enma",
        "email": "fullstack@test.com",
        "permisionLevel": 1,
        "password": "1234"
    },
    {
        "id": "54f1f25a-56fd-4a10-944c-c23367fcd175",
        "lastName": "Cespedes",
        "firstName": "Carlos",
        "email": "backend@test.com",
        "permisionLevel": 1,
        "password": "1234"
    }
];

router.get('/users', (req, res) => {
    res.status(200)
    res.json(users)

})

router.post('/users', (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email,
        password, permissionLevel } = req.body;

    const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password,
        permissionLevel
    };

    users.push(newUser);

    res.status(200).json({
        _id: newUser.id,
        firstName: newUser.firstName,
        email: newUser.email,
    })

})

router.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, password } = req.body;

    let user = users.find(user => user.id === userId);
    

    if (user) {
        users.splice(user, 1)
        user = {
            ...user,
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            password: password ? password : user.password
        }
        users.push(user)

        res.status(200)
            .json({
                message: `User ${userId} has been updated`
            })
    }
    else{
        res.status(401)
        .json({
            message: `User ${userId} not found`
        })
    }

})

router.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const user = users.find(user => user.id === userId);
    if (user) {
        users.splice(user, 1)
        res.status(200)
    .json({
        message: `User ${userId} has been deleted`
    })
    }else{
        res.status(401)
        .json({
            message: `User ${userId} not found`
        })
    }

})

export default router;