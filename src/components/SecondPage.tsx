import { FC, useEffect, useState } from 'react';
import './App.css';
import { Person } from './Person';
import { useNavigate } from 'react-router-dom';
import { BookView } from './BookView';


interface SecondPageProps {

}

export const SecondPage: FC<SecondPageProps> = (props: SecondPageProps) => {
    const[persons, setPersons] = useState([]);
    const[books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/personQuery/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080/personQuery/all',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setPersons(data);
            console.log(data);
        });
    });

    useEffect(() => {
        fetch("http://localhost:8080/bookQuery/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080/bookQuery/all',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setBooks(data);
            console.log(data);
        });
    }, [] );

    const onSortPriceDesc = async () => {
        const response = await fetch("http://localhost:8080/bookQuery/sortDesc", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080/bookQuery/sortDesc'
          }
        }
        ).then((response) => response.json());
        console.log(response)
        setBooks(response);
        console.log(response)
      };

      const onSortAlphabet = async () => {
        const response = await fetch("http://localhost:8080/bookQuery/alphabet", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080/bookQuery/alphabet'
          }
        }
        ).then((response) => response.json());
        console.log(response)
        setBooks(response);
        console.log(response)
    };

    const onAnotherPagePerson = () => {
        navigate("/secondPage");
    }

    const onAnotherPageBook = () => {
        navigate("/thirdPage");
    }

    return (
        <>
            <div className="head">
                <button className="first_button" onClick={onSortPriceDesc}>
                    Sortuj ksi????ki od najwiekszej ceny
                </button>
                <button className="first_button" onClick={onSortAlphabet}>
                    Sortuj ksi????ki alfabetycznie
                </button>
                <button className="first_button" onClick={onAnotherPagePerson}>
                    Stw??rz swojego klienta
                </button>
                <button className="first_button" onClick={onAnotherPageBook}>
                    Stw??rz swoj?? ksi????ke
                </button>
            </div>
            <div className="background">
                <div className="firstColumn">
                    Dane os??b:
                    {persons.map(person => (
                        <Person person={person}/>
                    ))}
                </div>
                <div className="secondColumn">
                        Ksi????ki:
                        {books.map(book => (
                        <BookView book={book}/>
                    ))}
                </div>
            </div>
        </>
    )
}