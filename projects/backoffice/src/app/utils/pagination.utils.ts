import { MatPaginator } from '@angular/material';

const labelPages = (paginator: MatPaginator) => {
  let from = paginator.pageSize * paginator.pageIndex + 1;

  let to =
    paginator.length < paginator.pageSize * (paginator.pageIndex + 1)
      ? paginator.length
      : paginator.pageSize * (paginator.pageIndex + 1);

  let toFrom = paginator.length == 0 ? 0 : `${from} - ${to}`;
  let pageNumber = paginator.length == 0 ? `0 de 0` : `${paginator.pageIndex + 1} de ${paginator.getNumberOfPages()}`;
  //let rows = `Pagina ${pageNumber} (${toFrom} de ${paginator.length})`;
  let rows = `Pagina ${pageNumber}`;
  return rows;
};

export { labelPages };
