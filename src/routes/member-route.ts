import express from 'express';
import * as memberController from '../controllers/member-controller';
import authenticateJwt from '../middleware/authenticate-jwt';
import checkRoles from '../middleware/check-roles';
import Role from '../enums/role';

const memberRoute = express.Router();

memberRoute.get('/', authenticateJwt, checkRoles([Role.Admin]), memberController.getMembers);
memberRoute.get('/member', authenticateJwt, checkRoles([Role.Admin, Role.Instructor, Role.Student]), memberController.getSelf);
memberRoute.get('/member/:id', authenticateJwt, checkRoles([Role.Admin]), memberController.getMember);

export default memberRoute;
