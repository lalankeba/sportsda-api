import express from 'express';
import * as facultyController from '../controllers/faculty-controller';
import requireAuthenticated from '../middleware/require-authenticated';
import checkRoles from "../middleware/check-roles";
import validateObjectId from '../middleware/validate-objectid';
import Role from '../enums/role';

const facultyRoute = express.Router();

facultyRoute.get('/', requireAuthenticated, facultyController.getFaculties);
facultyRoute.get('/:id', requireAuthenticated, checkRoles([Role.Admin, Role.Instructor]), validateObjectId, facultyController.getFaculty);
facultyRoute.post('/', requireAuthenticated, checkRoles([Role.Admin, Role.Instructor]), facultyController.addFaculty);
facultyRoute.put('/:id', requireAuthenticated, checkRoles([Role.Admin, Role.Instructor]), validateObjectId, facultyController.updateFaculty);
facultyRoute.delete('/:id', requireAuthenticated, checkRoles([Role.Admin]), validateObjectId, facultyController.deleteFaculty);

export default facultyRoute;
