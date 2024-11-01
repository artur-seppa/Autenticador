import {Router} from 'express'
import { UserController } from './controller/UserController';
import { FinancesController } from './controller/FinancesController';
import { AuthController } from './controller/AuthController';
import { AuthMiddlware } from './middlewares/auth';

// Controllers
const usercontroller = new UserController();
const financesController = new FinancesController();
const authcontroller = new AuthController();

/* 
    Rotas definidas com o devido tratamento ao acessar,
    isto eh, acessa o controller associado.

    Com o AuthMiddlware na instancia da rota definimos
    que ela precisa da verificacao de token antes de 
    seguir. Ou seja, o usuario tem que ta autenticado
*/
export const router = Router();

// Authenticate
router.post("/auth", authcontroller.authenticate)
router.get("/auth/verify", AuthMiddlware, authcontroller.verifyToken)

// User
router.post("/create", usercontroller.store)
router.get("/users", AuthMiddlware, usercontroller.index)

// Finances
router.post("/finance", AuthMiddlware, financesController.store)
router.post("/finance/search", AuthMiddlware, financesController.search)
router.post("/finance/delete", AuthMiddlware, financesController.deleteItem)