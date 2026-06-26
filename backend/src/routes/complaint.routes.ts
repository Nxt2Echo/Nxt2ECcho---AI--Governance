import { Router } from 'express';
import { ComplaintController } from '../controllers/complaint.controller';
import { createComplaintValidator, updateComplaintValidator } from '../validators/complaint.validator';
import { authenticate, authorize } from '../middlewares/auth';
import { upload } from '../middlewares/upload';
import { Role } from '../types';

const router = Router();

// Apply authentication middleware to all complaint routes
router.use(authenticate);

router.post(
  '/',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'voice', maxCount: 1 }]),
  createComplaintValidator,
  ComplaintController.createComplaint
);

router.get('/', ComplaintController.getComplaints);
router.get('/:id', ComplaintController.getComplaintById);

// Update/Delete routes might be restricted to specific roles, or the user who created it.
// Here we allow Admin to update/delete any, and Citizen can only read their own (logic should be in service ideally, kept simple here).
router.put(
  '/:id',
  authorize([Role.ADMIN, Role.CITIZEN]),
  updateComplaintValidator,
  ComplaintController.updateComplaint
);

router.delete(
  '/:id',
  authorize([Role.ADMIN]),
  ComplaintController.deleteComplaint
);

// Gemini utility routes
router.post('/analyze', authorize([Role.ADMIN]), ComplaintController.analyze);

export default router;
