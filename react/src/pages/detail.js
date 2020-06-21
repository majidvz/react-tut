import React, { Fragment } from "react";
import { productService } from "../components/product";
import { CreateComment, CommentsList } from "../components/comment";

export class Detail extends React.Component {
  state = { data: undefined };

  async componentDidMount() {
    let id = this.props.match.params.id;
    const { data } = await productService.getProductById(id);
    this.setState({ data });
  }

  async submitComment(comment) {
   const response = await productService.addComment(this.state.data.id, comment);
   if(response.status === 200) {
    const {data} = await productService.getComments(this.state.data.id);
    this.setState({data: {...this.state.data , comments: data }})
   }
  }

  render() {
    const data = this.state.data;
    if (!data) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-5">
            <img src={data.pic} width="100%" />
          </div>
          <div className="col-7">
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
            <strong style={styles.price}>{data.price}</strong>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-10 mx-auto">
            <CommentsList comments={data.comments || []} />
            <hr className="my-5" />
            <CreateComment onComment={this.submitComment.bind(this)} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  price: {
    color: "green",
    fontSize: 24,
  },
};
