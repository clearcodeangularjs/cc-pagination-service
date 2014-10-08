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
'use strict'

describe('pagination service', function(){
    beforeEach(module('sandboxApp'));

    beforeEach(function(){
        module(function($provide){
            $provide.value('$location', jasmine.createSpyObj('location', ['search']));
        });
    });

    var Pagination, $location, pagination;

    beforeEach(inject(function(_Pagination_, _$location_){
        Pagination = _Pagination_;
        $location = _$location_;

    }));

    describe('navigation methods', function(){
        beforeEach(function(){
            pagination = new Pagination(2, 8, 5, 10);
        });

        it('go to the next page', function(){
            expect($location.search).not.toHaveBeenCalled();
            pagination.goToNextPage();
            expect($location.search).toHaveBeenCalledWith('page', 3);
        });

        it('go to the previous page', function(){
            expect($location.search).not.toHaveBeenCalled();
            pagination.goToPrevPage();
            expect($location.search).toHaveBeenCalledWith('page', 1);
        });

        it('go to page', function(){
            expect($location.search).not.toHaveBeenCalled();
            pagination.goToPage(4);
            expect($location.search).toHaveBeenCalledWith('page', 4);
        });

        it('show if prev page is available', function(){
            expect(pagination.isPrevPageAvailable()).toBe(true);
            pagination = new Pagination(1, 8, 5, 10);
            expect(pagination.isPrevPageAvailable()).toBe(false);
        });

        it('show if next page is available', function(){
            expect(pagination.isNextPageAvailable()).toBe(true);
            pagination = new Pagination(5, 8, 5, 10);
            expect(pagination.isNextPageAvailable()).toBe(false);
        });

    });

    describe('.getItems()', function(){
        describe('when num_results <= max_items', function(){
            it('show whole items/pages', function(){
                pagination = new Pagination(1, 8, 3, 10);
                expect(pagination.getItems()).toEqual([
                    {value: 1, link: true},
                    {value: 2, link: true},
                    {value: 3, link: true},
                ]);
            });
        });

        describe('when num_results>max_items', function(){
            describe('when current_page = 1', function(){
                beforeEach(function(){
                    pagination = new Pagination(1, 100, 50, 3);
                });

                it('should return proper items', function(){
                    expect(pagination.getItems()).toEqual([
                        {value: 1, link: true},
                        {value: 2, link: true},
                        {value: '...', link: false}
                    ]);
                });
            });

            describe('when current_page = last', function(){
                beforeEach(function(){
                    pagination = new Pagination(50, 100, 50, 3);
                });

                it('should return proper items', function(){
                    expect(pagination.getItems()).toEqual([
                        {value: '...', link: false},
                        {value: 49, link: true},
                        {value: 50, link: true}
                    ]);
                });
            });

            describe('when current_page in the middle', function(){
                it('should return proper items when max_item small', function(){
                    pagination = new Pagination(20, 100, 50, 3);
                    expect(pagination.getItems()).toEqual([
                        {value: '...', link: false},
                        {value: 20, link: true},
                        {value: '...', link: false}
                    ]);
                });

                it('should return proper items when max_item bigger', function(){
                    pagination = new Pagination(20, 100, 50, 5);
                    expect(pagination.getItems()).toEqual([
                        {value: '...', link: false},
                        {value: 19, link: true},
                        {value: 20, link: true},
                        {value: 21, link: true},
                        {value: '...', link: false}
                    ]);
                });

                xit('should return proper items when middle arournd beginning or end', function(){
                    pagination = new Pagination(3, 100, 50, 6);
                    expect(pagination.getItems()).toEqual([
                        {value: '...', link: false},
                        {value: 2, link: true},
                        {value: 3, link: true},
                        {value: 4, link: true},
                        {value: '...', link: false}
                    ]);
                });
            });
        });
    });
});