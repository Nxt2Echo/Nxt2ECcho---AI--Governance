import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ComplaintService } from '../services/complaint.service';
import { GeminiService } from '../services/gemini.service';
import { StorageService } from '../services/storage.service';
import { AuthRequest } from '../middlewares/auth';
import { Status } from '../types';

export class ComplaintController {
  static async createComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      let imageUrl = '';
      let voiceUrl = '';

      if (files?.image && files.image[0]) {
        imageUrl = await StorageService.uploadImage(files.image[0].buffer, files.image[0].mimetype);
      }
      
      if (files?.voice && files.voice[0]) {
        voiceUrl = await StorageService.uploadVoice(files.voice[0].buffer, files.voice[0].mimetype);
      }

      const userId = req.user!.id;
      const { title, description, category, severity, latitude, longitude, ward, address } = req.body;

      // Leverage Gemini API
      const priorityScore = await GeminiService.generatePriority(description, severity);
      
      const newComplaint = await ComplaintService.createComplaint({
        userId,
        title,
        description,
        category,
        severity,
        priorityScore,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        ward,
        address,
        imageUrl,
        voiceUrl,
      });

      res.status(201).json({
        message: 'Complaint created successfully',
        data: newComplaint,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getComplaints(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const filters = req.query;
      const complaints = await ComplaintService.getComplaints(filters);
      res.status(200).json({ data: complaints });
    } catch (error) {
      next(error);
    }
  }

  static async getComplaintById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const complaint = await ComplaintService.getComplaintById(id);
      
      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      res.status(200).json({ data: complaint });
    } catch (error) {
      next(error);
    }
  }

  static async updateComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updatedComplaint = await ComplaintService.updateComplaint(id, req.body);

      if (!updatedComplaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      res.status(200).json({
        message: 'Complaint updated successfully',
        data: updatedComplaint,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = await ComplaintService.deleteComplaint(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Gemini specific endpoints (Optional utility endpoints)
  static async analyze(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { description } = req.body;
      if (!description) return res.status(400).json({ error: 'Description is required' });
      const analysis = await GeminiService.analyzeComplaint(description);
      res.status(200).json({ data: { analysis } });
    } catch (error) {
      next(error);
    }
  }
}
