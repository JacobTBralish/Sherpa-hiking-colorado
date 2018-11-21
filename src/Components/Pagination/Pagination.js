import React from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.scss';

const PaginationContainer = (props) => {
    return ( 
        <div className='paginationContainer'>
            <Pagination activePage = {props.activePage}
                itemsCountPerPage = {15}
                totalItemsCount = {props.articles.length}
                pageRangeDisplayed = {5}
                onChange = {props.handlePageChange}/>
        </div>
     );
}
 
export default PaginationContainer;