import React, { Component } from 'react';
import Pagination  from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
class Movie extends Component { 
    state = {
        movies: getMovies(),
        genres : [],
        currentPage : 1,
        pageSize : 4 ,
        sortColumn : {path : "title", order : "asc"}
    } 
    componentDidMount(){
        const genres=[{_id : '' ,name : 'All Genres'},...getGenres()]
        this.setState({movies : getMovies(), genres : genres})
    }

    handleDelete = (movie) => {
        // we use filter method to get all the movies except the one we deleted
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies }); // this.setState({movies : movies}); we can write 1 movies because there is repetition
    }

    handleLike = (movie) => {
        // Create a shallow copy of the movies array
        const movies = [...this.state.movies];
        // Find the index of the movie to be liked/unliked
        const index = movies.findIndex(m => m._id === movie._id);
        // Toggle the liked property of the movie
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }
    handlePageChange = (page) => {
        this.setState({currentPage : page})
    }
    handleGenreSelect = (genre) => { 
        this.setState({selectedGenre : genre, currentPage : 1})
    } ;
    handleSort = sortColumn => {
        this.setState({sortColumn})
        }
        render() { 
            const { pageSize, currentPage, sortColumn, selectedGenre } = this.state;
            if (this.state.movies.length === 0) return <p>There are no movies in this database!</p>;
        
            const filtered = selectedGenre && selectedGenre._id 
                ? this.state.movies.filter(m => m.genre._id === selectedGenre._id) 
                : this.state.movies;
        
            // Sort the filtered movies before paginating
            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        
            // Paginate the sorted movies
            const movies = paginate(sorted, currentPage, pageSize);
        
            return (
                <>
                    <div className="row">
                        <div className="col-3">
                            <ListGroup 
                                selectedItem={this.state.selectedGenre} 
                                items={this.state.genres} 
                                onItemSelect={this.handleGenreSelect} 
                            /> 
                        </div>
                        <div className="col">
                            <p>Here are the {filtered.length} movies in our database</p>
                            <MoviesTable 
                                movies={movies}
                                sortColumn={sortColumn}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                            />
                            <Pagination 
                                itemsCount={filtered.length} 
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                </>
            );
        }
        
}

export default Movie;
