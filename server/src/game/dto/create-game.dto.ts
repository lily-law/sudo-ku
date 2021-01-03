
export class CreateGameDto {
  readonly template: string
  readonly seed: string
  readonly difficulty: number
  readonly time: number
  readonly sparcity: number
}