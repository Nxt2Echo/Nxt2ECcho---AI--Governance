import { ComplaintModel } from '../models/Complaint';
import { Complaint, Status } from '../types';

export class ComplaintService {
  static async createComplaint(data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Complaint> {
    // We could add business logic here (e.g. AI analysis trigger)
    return await ComplaintModel.create(data);
  }

  static async getComplaints(filters?: Record<string, any>): Promise<Complaint[]> {
    return await ComplaintModel.findAll(filters);
  }

  static async getComplaintById(id: string): Promise<Complaint | null> {
    return await ComplaintModel.findById(id);
  }

  static async updateComplaintStatus(id: string, status: Status): Promise<Complaint | null> {
    return await ComplaintModel.update(id, { status });
  }

  static async updateComplaint(id: string, data: Partial<Complaint>): Promise<Complaint | null> {
    return await ComplaintModel.update(id, data);
  }

  static async deleteComplaint(id: string): Promise<boolean> {
    return await ComplaintModel.delete(id);
  }
}
