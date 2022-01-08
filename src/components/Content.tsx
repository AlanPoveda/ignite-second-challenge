import { MovieCard } from "./MovieCard";
import { useState, useEffect } from "react";

import { api } from "../services/api";

import { SideBar } from "./SideBar";

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface GenreResponseProps {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
}

interface ContentProps {
    id: number;
}

export function Content({ id }: ContentProps) {

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
        {} as GenreResponseProps,
    );

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then(
            (response) => {
                setMovies(response.data);
            },
        );

        api.get<GenreResponseProps>(`genres/${id}`).then(
            (response) => {
                setSelectedGenre(response.data);
            },
        );
    }, [id]);

    return (
        <div className="container">
            <header>
                <span className="category">
                    Categoria:<span> {selectedGenre.title}</span>
                </span>
            </header>

            <main>
                <div className="movies-list">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            title={movie.Title}
                            poster={movie.Poster}
                            runtime={movie.Runtime}
                            rating={movie.Ratings[0].Value}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
