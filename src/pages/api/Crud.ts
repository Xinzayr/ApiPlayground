// src/pages/api/crud.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface Persona {
  id?: number;
  nombre: string;
  apellido: string;
  direccion: string;
  observaciones?: string;
}

let personas: Persona[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(personas);
      break;
    case 'POST':
      const newPersona: Persona = req.body;
      newPersona.id = personas.length ? personas[personas.length - 1].id! + 1 : 1;
      personas.push(newPersona);
      res.status(201).json(newPersona);
      break;
    case 'PUT':
      const updatedPersona: Persona = req.body;
      const index = personas.findIndex(p => p.id === updatedPersona.id);
      if (index !== -1) {
        personas[index] = updatedPersona;
        res.status(200).json(updatedPersona);
      } else {
        res.status(404).json({ message: 'Persona not found' });
      }
      break;
    case 'DELETE':
      const { id } = req.body;
      personas = personas.filter(p => p.id !== id);
      res.status(200).json({ message: 'Deleted successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}