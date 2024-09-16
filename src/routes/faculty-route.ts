import express from 'express';
import * as facultyController from '../controllers/faculty-controller';
import authenticateJwt from '../middleware/authenticate-jwt';
import checkRoles from '../middleware/check-roles';
import Role from '../enums/role';
import validateObjectId from '../middleware/validate-objectid';

const facultyRoute = express.Router();

facultyRoute.get('/', facultyController.getFaculties);
facultyRoute.get('/:id', authenticateJwt, checkRoles([Role.Admin, Role.Instructor]), validateObjectId, facultyController.getFaculty);
facultyRoute.post('/', authenticateJwt, checkRoles([Role.Admin, Role.Instructor]), facultyController.addFaculty);
facultyRoute.put('/:id', authenticateJwt, checkRoles([Role.Admin, Role.Instructor]), validateObjectId, facultyController.updateFaculty);
facultyRoute.delete('/:id', authenticateJwt, checkRoles([Role.Admin]), validateObjectId, facultyController.deleteFaculty);

export default facultyRoute;
