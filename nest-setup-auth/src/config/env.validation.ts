import { plainToInstance } from 'class-transformer'
import { IsDefined, IsNumber } from 'class-validator'

class EnvironmentVariables {
  @IsDefined()
  @IsNumber()
  PORT: number
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })

  return validatedConfig
}
