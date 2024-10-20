import {Router} from 'express'
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { AuthMiddlware } from './middlewares/auth';

// Controllers
const usercontroller = new UserController();
const authcontroller = new AuthController();

/* 
    Rotas definidas com o devido tratamento ao acessar,
    isto eh, acessa o controller associado.

    Com o AuthMiddlware na instancia da rota definimos
    que ela precisa da verificacao de token antes de 
    seguir. Ou seja, o usuario tem que ta autenticado
*/
export const router = Router();

router.post("/create", usercontroller.store)
router.get("/users", AuthMiddlware, usercontroller.index)
router.post("/auth", authcontroller.authenticate)