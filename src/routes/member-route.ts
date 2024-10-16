import express from 'express';
import * as memberController from '../controllers/member-controller';
import validateObjectId from '../middleware/validate-objectid';
import requireAuthenticated from '../middleware/require-authenticated';
import checkRoles from '../middleware/check-roles';
import Role from '../enums/role';

const memberRoute = express.Router();

memberRoute.get('/', requireAuthenticated, checkRoles([Role.Admin]), memberController.getMembers);
memberRoute.get('/member', requireAuthenticated, checkRoles([Role.Admin, Role.Instructor, Role.Student]), memberController.getSelf);
memberRoute.get('/member/:id', requireAuthenticated, checkRoles([Role.Admin]), validateObjectId, memberController.getMember);
memberRoute.put('/member', requireAuthenticated, checkRoles([Role.Admin, Role.Instructor, Role.Student]), memberController.updateSelf);
memberRoute.put('/member/:id', requireAuthenticated, checkRoles([Role.Admin]), memberController.updateMember);

export default memberRoute;
