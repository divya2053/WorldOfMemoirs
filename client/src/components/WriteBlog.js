import React from 'react'
import ReactQuill from 'react-quill'
import { Container, Form, Button } from 'react-bootstrap'

class WriteBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', title:'' }
        this.handleChange = this.handleChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    handleTitleChange(title){
        this.setState({ title:title });
    }

    handleClick(event){
        event.preventDefault();
        console.log(this.state.title , this.state.text);
    }

    render() {
        return (
            <Container style={{width : '75%'}}>
                <Form style={{width:'100%'}}>
                    <Form.Group className="mb-4">
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Blog Title" 
                            value={this.state.title}
                            onChange={(e) => this.handleTitleChange(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Enter your Blog Content</Form.Label>
                        <ReactQuill value={this.state.text}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleClick}>
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default WriteBlog;
