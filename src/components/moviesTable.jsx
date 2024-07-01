import React, { Component } from 'react';
import TableHeader from './tableHeaders';
import Like from './common/like';
import TableBody from './common/tableBody';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title', content : movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: 'like',
            content: movie => (
                <Like
                    liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            )
        },
        {
            key: 'delete',
            content: movie => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            )
        }
    ];

    render() {
        const { movies, sortColumn, onSort } = this.props;
        return (
            <table className="table">
                <TableHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={movies}
                    columns={this.columns} // Pass columns to TableBody
                />
            </table>
        );
    }
}

export default MoviesTable;
