import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;
    const provider_id = req.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointments,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(appointments));
  }
}
