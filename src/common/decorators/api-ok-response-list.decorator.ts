import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { AppResponse } from '../dto/app-response.dto';

export const ApiOkResponseList = <DataDto extends Type<unknown>>(
  dataDto: DataDto
) =>
  applyDecorators(
    ApiExtraModels(AppResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) }
              }
            }
          }
        ]
      }
    })
  );
