export type PayloadJWT = {
  iat: number;
  exp: number;
  tokenType: string;
  userId: number;
};

export type UploadFileType = { message: string; data: string };
