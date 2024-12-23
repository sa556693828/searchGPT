"use client";
import React, { useEffect, useState } from "react";
import { BookData } from "@/types";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillHandThumbsDownFill } from "react-icons/bs";

interface QueryBookRowProps {
  book: BookData;
  updateBookList: (bookId: string) => void;
}

const QueryBookRow = ({ book, updateBookList }: QueryBookRowProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeMenuId &&
        !(event.target as Element).closest(".menu-container")
      ) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeMenuId]);

  return (
    <div
      onClick={() => {
        window.open(book.link, "_blank");
      }}
      className="bg-[#D8D8D8] relative flex flex-col p-4 cursor-pointer hover:bg-[#b5b5b5] gap-4 transition-all duration-300 rounded-[4px]"
    >
      <div className="flex gap-1">
        {book.book_keywords &&
          book.book_keywords.length > 0 &&
          book.book_keywords.map((keyword, index) => (
            <div
              key={index}
              className="rounded-[4px] bg-[#CAC3BB] p-[6px] text-[12px]"
            >
              {keyword}
            </div>
          ))}
      </div>
      <p className="text-sm font-bold">{book.title}</p>
      <div className="flex absolute top-2 right-2 items-center justify-center cursor-pointer menu-container">
        <HiDotsHorizontal
          className="size-3 text-[#969696] "
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenuId(activeMenuId === book.isbn ? null : book.isbn);
          }}
        />
        {activeMenuId === book.isbn && (
          <div className="absolute right-0 top-3 bg-[#E8E8E8] hover:bg-[#E8E8E8]/80 rounded-lg min-w-[120px] z-10">
            <button
              className="w-full px-3 py-2 text-black text-xs flex items-center justify-between gap-2"
              onClick={(e) => {
                e.stopPropagation();
                updateBookList(book.isbn);
                setActiveMenuId(null);
              }}
            >
              沒興趣
              <BsFillHandThumbsDownFill className="size-3" color="" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryBookRow;
