import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import '../CSS/SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        if (!/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            toast('Invalid Email', { position: toast.POSITION.TOP_RIGHT })
            return
        }
        fetch("/signup", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    toast(data.error,
                        { position: toast.POSITION.TOP_RIGHT })
                } else {
                    toast(data.message,
                        { position: toast.POSITION.TOP_RIGHT })
                    navigate('/signin')
                }
            }).catch(err=>{
                console.log(err)
            })
    }
    return (
        <Container>
            <Row>
                <Col sm={12} lg={6}>
                    <div className="aboutUs">
                        <h1>
                            About Us
                        </h1>
                        <h4>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </h4>
                    </div>
                </Col>
                <Col sm={12} lg={6}>
                    <div className="signUpCard">
                        <div className="card AuthCard input-field">
                            <h2 className="signUpHeading">RESUME BUILDER</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="signUpButton btn waves-effect waves-light blue darken-1"
                                onClick={() => PostData()}
                            >Sign Up
                            </button>
                            <h5>
                                <Link className="linkStyle" to='/signin'>Already Have an Account?</Link>
                            </h5>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;