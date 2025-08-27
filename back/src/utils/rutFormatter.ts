export function formatRut(rut: string):string {
    
    const cleanRut = rut.replace(/[\.\-\s]/g, '').toUpperCase();            // Elimina puntos, guiones, espacios y convierte a mayusculas
  
    if (cleanRut.length < 2) return rut;

    const body = cleanRut.slice(0, -1);                                     // Separa el cuerpo del dígito verificador
    const verifier = cleanRut.slice(-1);

    return `${body}-${verifier}`;                                           // formateo con el guión
}