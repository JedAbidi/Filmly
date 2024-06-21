import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
class Movie extends Component {
    state = {
        movies : getMovies()
      } 
    handleDelete= (movie) => {
        //we use filter method to get all the movies except the one we deleted
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies}); //this.setState({movies : movies}); we can write 1 movies because there is repetition
    }
    render() { 
        if (this.state.movies.length === 0) return <p>There are no movies on this database !</p>
        return(
        <>
        <p>Here are the {this.state.movies.length} in our database</p>
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.movies.map(movie => (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
                ))}
            </tbody>
        </table> 
        </>
        ) 
    }
}
 
export default Movie;