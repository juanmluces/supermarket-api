import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { AppResponse } from '../dto/app-response.dto';

export const ApiOkResponseCustomProperties = (
  properties: Record<string, any>
) =>
  applyDecorators(
    ApiExtraModels(AppResponse),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponse) },
          {
            properties: {
              data: {
                type: 'object',
                properties
              }
            }
          }
        ]
      }
    })
  );
