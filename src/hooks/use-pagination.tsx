import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

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

  return {
    page,
    perPage,
    nextPage,
    lastPage,
    previousPage,
    firstPage,
    setPerPage,
  };
};
