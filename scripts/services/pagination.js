/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-pagination-service.

    cc-pagination-service is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-pagination-service is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-pagination-service.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';

angular.module('cc.pagination.service')
    .factory('Pagination', ['$location', function($location){
        var Pagination = function(current_page, num_results, num_pages, max_items){
            this.current_page = current_page;
            this.num_results = num_results;
            this.num_pages = num_pages;
            this.max_items = max_items;
            this.items = this.getItems();
        };

        Pagination.prototype.goToNextPage = function(){
            if(this.isNextPageAvailable()){
                this.goToPage(this.current_page + 1);
            }
        };

        Pagination.prototype.goToPrevPage = function(){
            if(this.isPrevPageAvailable()){
                this.goToPage(this.current_page - 1);
            }
        };

        Pagination.prototype.goToPage = function(page){
            $location.search('page', page);
        };

        Pagination.prototype.isPrevPageAvailable = function(){
            return this.current_page != 1;
        };

        Pagination.prototype.isNextPageAvailable = function(){
            return this.current_page != this.num_pages;
        };

        Pagination.prototype.getItems = function(){
            var items = [];
            var range;
            var startRange;
            var endReached;

            if(!this.num_pages || !this.max_items || !this.current_page){
                return [];
            }

            if(this.num_pages <= this.max_items){
                angular.forEach(_.range(1, this.num_pages+1), function(v){
                    items.push({value: v, link: true});
                });
            }
            else {
                if(this.current_page == 1){
                    angular.forEach(_.range(1, this.max_items), function(v){
                        items.push({value: v, link: true});
                    });
                    items.push({value: '...', link: false});
                }

                else if(this.current_page == this.num_pages){
                    items.push({value: '...', link: false});
                    range = _.range(this.num_pages+2 - this.max_items, this.num_pages+1);
                    angular.forEach(range, function(v){
                        items.push({value: v, link: true});
                    });
                }

                else {
                    startRange = this.current_page - Math.floor((this.max_items-2)/2);
                    if(startRange<1){
                        startRange = 1;
                    }
                    else {
                        items.push({value: '...', link: false});
                    }
                    var i = startRange;
                    endReached = false;
                    while(i-startRange < this.max_items-2){
                        if(i>this.num_pages){
                            endReached = true;
                            break;
                        }
                        items.push({value: i, link: true});
                        i++;
                    }
                    if(!endReached){
                        items.push({value: '...', link: false});
                    }
                }
            }

            return items;
        };

        return Pagination;
    }]);