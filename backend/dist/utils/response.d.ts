import { Response } from 'express';
import { ApiResponse } from '../types';
export declare const sendResponse: <T>(res: Response, statusCode: number, message: string, data?: T, meta?: ApiResponse["meta"]) => Response;
export declare const sendError: (res: Response, statusCode: number, message: string) => Response;
//# sourceMappingURL=response.d.ts.map