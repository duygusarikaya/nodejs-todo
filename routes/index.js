var express = require('express');
var router = express.Router();
var users = require('../controllers/userController');
var todos = require('../controllers/todoController');

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       name:
 *          type: string
 *       email:
 *          type: string
 *       pass:
 *          type: string
 *          format: password
  *   Todo:
 *     properties:
 *       user_id:
 *          type: string
 *       title:
 *          type: string
 *       details:
 *          type: string
 *       created_at:
 *          type: string
 *          format: date-time
 *       state:
 *          type: string
 *          default: open
 *          enum:
 *          - open
 *          - inprogress
 *          - done
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - dev
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/users', users.get_god_mode);
/**
 * @swagger
 * /api/todos:
 *   get:
 *     tags:
 *       - dev
 *     description: Returns all todos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of todos
 *         schema:
 *           $ref: '#/definitions/Todo'
 */
router.get('/api/todos', todos.get_god_mode);

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 *       401:
 *         description: Failed register
 */
router.post('/api/register', users.add);

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - users
 *     description: Login for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Failed login
 */
router.post('/api/login', users.login);


/**
 * @swagger
 * /api/users/{id}/todos:
 *   get:
 *     tags:
 *       - users/todos
 *     description: Returns all todos of the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Authorization
 *         description: apikey
 *         in: header
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: An array of users' todos
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       401:
 *         description: Unauthorized
 */
router.get('/api/users/:id/todos', todos.get_all);

/**
 * @swagger
 * /api/users/{id}/todos:
 *   post:
 *     tags:
 *       - users/todos
 *     description: Creates a new todo entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: todo
 *         description: Todo object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: String
 *       - name: Authorization
 *         description: apikey
 *         in: header
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       401:
 *         description: Unauthorized
 */
router.post('/api/users/:id/todos', todos.add);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     tags:
 *       - todos
 *     description: Returns a single todo entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: todo's id
 *         in: path
 *         required: true
 *         type: String
 *       - name: Authorization
 *         description: apikey
 *         in: header
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: A single todo entry
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       401:
 *         description: Unauthorized
 */
router.get('/api/todos/:id', todos.get);

/**
 * @swagger
 *  /api/todos/{id}:
 *   put:
 *     tags:
 *       - todos
 *     description: Updates a single todo entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: todo's id
 *         in: path
 *         required: true
 *         type: String
 *       - name: todo
 *         description: Todo object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       - name: Authorization
 *         description: apikey
 *         in: header
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       401:
 *         description: Unauthorized
 */
router.put('/api/todos/:id', todos.update);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     tags:
 *       - todos
 *     description: Deletes a single todo entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: todo's id
 *         in: path
 *         required: true
 *         type: String
 *       - name: Authorization
 *         description: apikey
 *         in: header
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       401:
 *         description: Unauthorized
 */
router.delete('/api/todos/:id', todos.delete);


module.exports = router;