# AngluarMyFlixClient

## Project Objective
The goal of this project was to build a client side web application with the Angular framework. This web application utilizes the [Movies API project](https://nickflixapi.herokuapp.com/documentation.html) to allow the user to view information about movies & create/edit favorite movies list. Angular material library was used to create UI views.

<br>

## Features
* Return a list of ALL movies
* Return data about a single movie to the user
* Return data about a genre and its description
* Return a list of movies based on a single genre match
* Return a list of directors and their information (bio, birth year, death year)
* Return data about a single director
* Allow user to register an account
* Allow users to update their personal info (username, password, email, date of birth)
* Allow users to add a movie from their favorites list
* Allow users to remove a movie from their favorites list
* Allow existing users to delete their account

<br>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Deploy

`Deploy with ghpages:`
* `ng add angular-cli-ghpages`

**`Warning:`** use cmd prompt & NOT `Gitbash` to build & deploy with ghpages. Gitbash was having issues with --base-href /repo-name/

* `ng deploy --base-href /repo-name/`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.