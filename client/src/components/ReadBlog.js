import React from 'react'
import { Container, Badge, Stack } from 'react-bootstrap'

class WriteBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convallis congue gravida. Vestibulum vestibulum tortor eget mauris porta tempor. Aenean eleifend mattis odio at lobortis. Pellentesque eu dolor eget risus gravida scelerisque ac vel massa. Etiam tempor congue turpis ac maximus. Cras at mauris vitae nisi malesuada vehicula quis id erat. Aenean id massa elit. Aliquam erat volutpat. Vivamus elit neque, rutrum in nibh in, vulputate vestibulum mi.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Morbi sollicitudin, quam et vulputate convallis, ante nibh placerat purus, at tincidunt elit ligula id magna. Maecenas rutrum fermentum lectus fermentum ultricies. Aliquam laoreet diam vel est placerat, vel laoreet ligula vulputate. Cras pulvinar ac magna vel pretium. Nulla vel ornare dolor. Ut et magna augue. Ut ultrices erat nec feugiat tincidunt. Etiam vel viverra dui, vitae iaculis tortor. Donec vel purus ultricies lorem consectetur luctus sagittis non nunc. Praesent enim purus, efficitur at lectus sit amet, sagittis imperdiet purus. Aliquam gravida sem eget libero bibendum, eu tempor turpis eleifend. Sed in ipsum sed risus efficitur congue quis vitae felis. Etiam a varius lorem, id vulputate turpis.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Integer ultrices, dui in malesuada malesuada, neque risus facilisis ipsum, id accumsan lacus mauris eu arcu. Nullam at odio sed ex molestie faucibus. Fusce efficitur eros et elit pharetra, accumsan accumsan dolor faucibus. Pellentesque ultrices felis ac ligula mollis blandit. Fusce eu sagittis sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc luctus non lorem vel consectetur. Sed quis dui in leo porta imperdiet non quis augue. Aliquam quis vehicula libero. </p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Maecenas in lectus in urna imperdiet mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec posuere orci sed luctus mollis. Vivamus condimentum lorem ipsum, et accumsan ante aliquam ac. Cras orci ipsum, placerat eu molestie non, blandit ac eros. Suspendisse tristique mattis felis sed congue. Donec a vulputate neque. Duis mollis felis id lectus elementum ultricies.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Donec nec ipsum tempus, dapibus lorem sit amet, feugiat purus. Nunc ut tortor auctor, eleifend sapien sed, pulvinar magna. Proin vel est volutpat, rutrum nisi vitae, posuere sapien. Donec turpis leo, congue in consectetur molestie, maximus nec quam. Etiam tristique fermentum lorem, id elementum erat maximus ut. Fusce ligula odio, viverra ac commodo vitae, commodo at tellus. Nam iaculis lorem at leo euismod accumsan. Vivamus cursus arcu a mauris placerat scelerisque. In erat sapien, ornare vel urna sed, bibendum tempus justo. Duis rutrum ante sed magna dapibus molestie. </p>`, 
            title: 'Blog Title' , 
            author : 'admin', 
            date: new Date().toLocaleDateString() 
        }
    }


    render() {
        return (
            <Container>
                <Stack>
                    <div>
                        <h1 style={{display:'inline'}}>
                            {this.state.title} 
                        </h1>&nbsp;<h1 style={{ display: 'inline', marginBottom:'100px', fontSize:'25px'}}><Badge className="align-text-top" bg="success">New</Badge></h1>
                    </div>
                    <p style={{ color:"#a4a5a6"}}> Created By : {this.state.author} at {this.state.date} </p>
                    <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
                </Stack>
            </Container>
        )
    }
}

export default WriteBlog;
