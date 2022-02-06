import React from 'react'
import { Card , Button , Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './Homepage.css'

class HomePage extends React.Component {
    constructor(props) {
        super(props)

    }

    handleClick(id){
        let newPath = `/readblog/${id}`;
        this.props.history.push(newPath);
    }

    render() {
        return (
            <Container fluid className='parent'>
                
                {[1,2,3,4,5,6,7,8,8].map(ele=>{
                    return (
                        <Card className='child'>
                            <Card.Body>
                                <Card.Title>Blog Title</Card.Title>
                                <Card.Text className="text-truncate">
                                    Short Description of the blog. This text will be truncated.
                                </Card.Text>
                                <Button variant="primary" onClick={(e)=>this.handleClick(ele)} >Read the Blog</Button>
                            </Card.Body>
                        </Card>
                    )
                })}

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>

                <Card className='child'>
                    <Card.Body>
                        <Card.Title>Blog Title</Card.Title>
                        <Card.Text>
                            Short Description of the blog
                        </Card.Text>
                        <Button variant="primary">Read the Blog</Button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default HomePage;
