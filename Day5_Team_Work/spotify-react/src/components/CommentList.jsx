import React from "react";
import { Badge, ListGroup, Button, Spinner } from "react-bootstrap";

class CommentList extends React.Component {

  state = {
    comments: [],
    loading: true
  }

  componentDidMount = async () => {
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const comments = await fetch(commentsUrl + this.props.id, {
      headers: new Headers({
        'Authorization': 'Basic ' + btoa("user16:c9WEUxMS294hN6fF"),
      }),
    }).then((response) => response.json());
    this.setState({ comments });
    if (this.state.comments.length === 0) {
      setTimeout(() => this.setState({
        loading: false
      }), 1000)
    }
  }

  render() {
    return (
      <>
        {this.state.comments.length > 0 && this.state.comments ?

          this.state.comments.map((comment) => (
            <ListGroup key={comment._id}>
              <ListGroup.Item className="d-flex justify-content-between">
                <div>
                  <Badge pill variant="info" className="mr-3">
                    {comment.rate}
                  </Badge>
                  {comment.comment}
                </div>
                <div>
                  <Button className="mr-2" variant="danger" onClick={() => this.props.deleteComment(comment._id)}>Delete</Button>
                  <Button variant="warning" onClick={() => this.props.editComment(comment._id)}>Edit</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))
          :
          <>
            {this.state.loading ?
              <Spinner className="align-self-center" animation="border" variant="dark" />
              :
              <p>There are no comments for this album</p>
            }
          </>
        }
      </>
    )


  }
}

export default CommentList;
