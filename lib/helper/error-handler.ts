// types.ts dan yoki shu yerning o'zida interfayslarni e'lon qiling
export interface GlobalErrorResponse {
  success: boolean;
  statusCode: number;
  error: {
    message: string | string[];
    error?: string;
    statusCode: number;
  };
}

export const getApiErrorMessage = (error: unknown): string => {
  // RTK Query xatolik strukturasi ekanligini tekshirish
  const err = error as { data?: GlobalErrorResponse };

  const backendError = err?.data?.error;

  if (!backendError) {
    return "Tizimda kutilmagan xatolik yuz berdi";
  }

  // Agar ValidationPipe massiv qaytarsa, birinchisini olamiz
  if (Array.isArray(backendError.message)) {
    return backendError.message[0];
  }

  // Agar BadRequestException string qaytarsa
  return backendError.message;
};
