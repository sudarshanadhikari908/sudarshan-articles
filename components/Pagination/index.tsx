import React from "react";
import Link from "next/link";
import { API_URL, PER_PAGE } from "@/config/index";

interface Props {
  page: number;
  total: number;
}

const Pagination: React.FC<Props> = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <div>
      {page > 1 && (
        <Link href={`/articles?page=${page - 1}`}>
          <a className="btn btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/articles?page=${page + 1}`}>
          <a className="btn btn-secondary">Next</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
