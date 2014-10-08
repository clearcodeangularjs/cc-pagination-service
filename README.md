Clearcode Pagination Service
=========

This service prepares pagination bar for pagination purposes. Adds search additional page value in search object.

Installation
--------------
TODO


Usage
------

Add ``` cc.pagination.service ``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.pagination.service'
    ]);
```
and you are ready to go!

How to use service:

```
var pagination = new Pagination(current_page, num_results, num_pages, max_items);

//methods

pagination.goToNextPage(); 

pagination.goToPrevPage();

pagination.goToPage();

pagination.isPrevPageAvaible();

pagination.isNextPageAvaible();

pagination.getItems(); // gets items for pagination bar

```
Author
------

Roman Sek


License
----

LGPL

