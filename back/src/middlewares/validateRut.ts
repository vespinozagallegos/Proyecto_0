import { NextFunction, Request, Response } from "express";

// validación de formato y dígito verificador
function isValidRut(rut: string): boolean {
  if (!rut || typeof rut !== 'string') return false;
  
  // Limpieza y formateo de RUT
  const cleanRut = rut.replace(/\./g, '').replace('-', '').toUpperCase();
  if (cleanRut.length < 2) return false;
  
  const rutDigits = cleanRut.slice(0, -1);
  const verifierDigit = cleanRut.slice(-1);
  
  // Validación para que los dígitos sean números y el verificador sea número o K
  if (!/^\d+$/.test(rutDigits)) return false;
  if (!/^[0-9K]$/.test(verifierDigit)) return false;
  
  // Calculo de dígito verificador esperado
  let sum = 0;
  let multiplier = 2;
  
  for (let i = rutDigits.length - 1; i >= 0; i--) {
    sum += parseInt(rutDigits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDigit = 11 - (sum % 11);
  let calculatedDigit: string;
  
  if (expectedDigit === 11) calculatedDigit = '0';
  else if (expectedDigit === 10) calculatedDigit = 'K';
  else calculatedDigit = expectedDigit.toString();
  
  return calculatedDigit === verifierDigit;
}

// Middleware
export const validateRut = (req: Request, res: Response, next: NextFunction): void => {
  const { rut } = req.body;
  
  if (!rut) {
    res.status(400).json({
      message: "El RUT es requerido"
    });
    return;
  }
  
  if (!isValidRut(rut)) {
    res.status(400).json({
      message: "El RUT no tiene un formato válido. Debe ser como: 12345678-9"
    });
    return;
  }
  
  next();
};