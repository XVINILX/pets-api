/**
 * @param search string - Search by enterprise name
 */
export class GetAnimalBySlugCommand {
  constructor(public readonly slug: string) {}
}
