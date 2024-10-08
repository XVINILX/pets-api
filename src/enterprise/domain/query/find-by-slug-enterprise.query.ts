/**
 * @param search string - Search by enterprise name
 */
export class GetEnterpriseBySlugQuery {
  constructor(public readonly slug: string) {}
}
