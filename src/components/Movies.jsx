import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
    const [api, setApi] = useState([]);
    const [search, setSearch] = useState('');
    const  navigate = useNavigate();
    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/trending/movie/day?&api_key=caa70c793d4d1bd32591a3325ee86e3e&language=en-US")
        .then(response=>response.json())
        .then(data=>setApi(data.results))
        .catch((error) => console.error('Error fetching data:', error));
        
    },[])
    console.log(api);

    function SearchMovies(){
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=caa70c793d4d1bd32591a3325ee86e3e`)
       .then(response=>response.json())
       .then(data=>setApi(data.results))
       .catch((error) => console.error('Error fetching data:', error));
    }
    
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">TMDB</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Movies</Nav.Link>
            <NavDropdown title="TV Shows" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Popular</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                On TV
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Top Rated
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              More
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="api"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button onClick={SearchMovies} variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
        <Carousel>
          {api.map((item,ind)=>{
            return(
                <div key={ind}>
                    <img style={{overflow:"hidden"}} src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title}/>
                    <p>{item.title}</p>
                </div>
            )
          })}
        </Carousel>
    </div>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
        {
            api.map((item,ind)=>{
                return(
                    <div key={ind}>
                        <Card style={{ width: '18rem',marginTop:"20px"}}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.overview}
                                </Card.Text>
                                <Button onClick={()=>navigate("/page",{state:{item}})} variant="primary">About Movie</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        }
    
    </div>
      
    </>
  )
}

export default Movies
