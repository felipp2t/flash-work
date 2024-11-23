import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PaginationProps {
  items: number;
  pages: number;
  page: number;
}

export const Pagination = ({ items, pages, page }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const nextPage = (pages: number) => {
    if (page + 1 > pages) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page + 1));
      return params;
    });
  };

  const lastPage = (pages: number) => {
    setSearchParams((params) => {
      params.set("page", String(pages));
      return params;
    });
  };

  const previousPage = () => {
    if (page - 1 <= 0) {
      return;
    }
    setSearchParams((params) => {
      params.set("page", String(page - 1));
      return params;
    });
  };

  const firstPage = () => {
    setSearchParams((params) => {
      params.set("page", "1");
      return params;
    });
  };

  const setPerPage = (value: string) => {
    setSearchParams((params) => {
      params.set("per_page", value);
      return params;
    });
  };

  return (
    <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Mostrando {perPage > items ? items : perPage} of {items}
      </span>
      <div className="flex items-center gap-8">
        <div className="flex w-fit items-center gap-2">
          <span>Serviços por página</span>

          <Select
            defaultValue="10"
            onValueChange={(value) => setPerPage(value)}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10" className="text-white">
                10
              </SelectItem>
              <SelectItem value="20" className="text-white">
                20
              </SelectItem>
              <SelectItem value="50" className="text-white">
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span>
          {page} de {pages}
        </span>
        <div className="space-x-1.5">
          <Button
            className="aspect-square"
            onClick={firstPage}
            size="icon"
            variant="secondary"
            disabled={page - 1 <= 0}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First Page</span>
          </Button>
          <Button
            className="aspect-square p-0"
            onClick={previousPage}
            size="icon"
            variant="secondary"
            disabled={page - 1 <= 0}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            className="aspect-square p-0"
            onClick={() => nextPage(pages)}
            size="icon"
            variant="secondary"
            disabled={page + 1 > pages}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next Page</span>
          </Button>
          <Button
            className="aspect-square p-0"
            onClick={() => lastPage(pages)}
            size="icon"
            variant="secondary"
            disabled={page + 1 > pages}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
