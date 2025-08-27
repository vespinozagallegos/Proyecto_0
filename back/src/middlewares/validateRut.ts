import { NextFunction, Request, Response } from "express";

// validación de formato y dígito verificador
function isValidRut(rut: string): boolean {
//   console.log('=== DEPURACIÓN RUT ===');
//   console.log('RUT recibido:', rut);

  if (!rut || typeof rut !== 'string') {
    //   console.log('Falló: RUT vacío o no es string');
      return false;
  }

  // Validación de formato básico
  if (!/^[0-9]{1,8}-[0-9Kk]$/.test(rut)){
    // console.log('Falló: No cumple formato básico');
    // console.log('Regex test result:', /^[0-9]{1,8}-[0-9Kk]$/.test(rut));
    return false;
  }

  // Separar cuerpo y dígito verificador
  const [rutDigits, verifierDigit] = rut.split('-');
//   console.log('rutDigits:', rutDigits, 'verifierDigit:', verifierDigit);
  
  // Validación básica
  if (!rutDigits || !verifierDigit) {
    // console.log('Falló: No se pudo separar cuerpo y dígito');
    return false;
  }

  if (!/^\d+$/.test(rutDigits)) {
    // console.log('Falló: El cuerpo no son solo dígitos');
    return false;
  }

  if (!/^[0-9Kk]$/.test(verifierDigit)) {
    // console.log('Falló: Dígito verificador inválido');
    return false;
  }
  
  // Calculo de dígito verificador esperado
  let sum = 0;
  let multiplier = 2;
  
//    console.log('=== CÁLCULO DIGITO VERIFICADOR ===');

  // Recorrer el RUT de derecha a izquierda
  for (let i = rutDigits.length - 1; i >= 0; i--) {
    const digit = parseInt(rutDigits[i]);
    const partial = digit * multiplier;
    sum += partial;
    // console.log(`Dígito[${i}]: ${digit} * Multiplicador: ${multiplier} = ${partial} → Suma acumulada: ${sum}`);
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
//   console.log('Suma total:', sum);
  const remainder = sum % 11;
//   console.log('Resto de división por 11:', remainder);
  
  const expectedDigit = 11 - remainder;
//   console.log('11 - resto =', expectedDigit);
  
  let calculatedDigit: string;
  
  if (expectedDigit === 11) {
    calculatedDigit = '0';
    // console.log('Caso: expectedDigit === 11 → calculatedDigit = "0"');

  } else if (expectedDigit === 10) {
    calculatedDigit = 'K';
    // console.log('Caso: expectedDigit === 10 → calculatedDigit = "K"');
  } else {
    calculatedDigit = expectedDigit.toString();
    // console.log('Caso: normal → calculatedDigit =', calculatedDigit);
  }
//   console.log('=== RESULTADO FINAL ===');
//   console.log('Dígito calculado:', calculatedDigit);
//   console.log('Dígito recibido:', verifierDigit.toUpperCase());
//   console.log('¿Coinciden?:', calculatedDigit === verifierDigit.toUpperCase());
//   console.log('========================');
  
  return calculatedDigit === verifierDigit.toUpperCase();
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
      message: "El RUT no tiene un formato válido. Debe ser como: 12345678-9 o 11222333-K"
    });
    return;
  }
  
  next();
};