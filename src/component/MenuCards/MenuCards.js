import React from 'react';

import usePagination from "../Pagination/usePagination";
import PerfumeCardItem from "../PerfumeCardItem/PerfumeCardItem";
import PaginationItem from "../Pagination/PaginationItem";
import SearchForm from "../SearchForm/SearchForm";

const MenuCards = ({ data, itemsPerPage, startFrom, searchByData }) => {
    const { slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching } = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    return (
        <div className="container">
            {/* <div className="container-fluid row mt-5 ml-2">
                <SearchForm
                    data={data}
                    searchByData={searchByData}
                    setFilteredData={setFilteredData}
                    setSearching={setSearching} />
            </div> */}
            <div className="row mt-0 ml-0">
                <div className="container-fluid">
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage} />
                    <div className="row">
                        {slicedData.map((job) => {
                            return (
                                <PerfumeCardItem
                                    job={job}
                                    colSize={4}
                                    link={"/product"}
                                    btnName1={"SHOW MORE"}
                                    btnName2={"SAVE JOB"} />
                            );
                        })}
                    </div>
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage} />
                </div>
            </div>
        </div>
    );
}

export default MenuCards;